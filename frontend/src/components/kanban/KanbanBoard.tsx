import { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { Center, Flex, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragStartEvent,
} from "@dnd-kit/core";

import KanbanColumn from "./KanbanColumn";
import LeadCard from "./LeadCard";
import LeadDrawer from "./LeadDrawer";

import {
    getLeads,
    updateLeadStatus,
    type Lead,
} from "../../api/leads";

import {
    getStatuses,
    type LeadStatus,
} from "../../api/statuses";

export default function KanbanBoard() {

    const [loading, setLoading] = useState(true);
    const previousIds = useRef<number[]>([]);
    const [statuses, setStatuses] = useState<LeadStatus[]>([]);

    const [leads, setLeads] = useState<Lead[]>([]);

    const [activeLead, setActiveLead] = useState<Lead | null>(null);

    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    const [drawerOpened, setDrawerOpened] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 6,
            },
        }),
    );

    useEffect(() => {

        async function loadFirst() {

            const [leadData, statusData] = await Promise.all([
                getLeads(),
                getStatuses(),
            ]);

            setLeads(leadData);
            setStatuses(statusData);
            setLoading(false);

        }

        loadFirst();

    }, []);
 useEffect(() => {

    const interval = setInterval(async () => {

        const leadData = await getLeads();

        const oldIds = previousIds.current;

        const newLead = leadData.find(
            (lead) => !oldIds.includes(lead.id),
        );

        if (newLead && oldIds.length > 0) {

            notifications.show({
                title: "Новый лид",
                message: `${newLead.comment.username} оставил комментарий`,
                color: "green",
            });

        }

        previousIds.current = leadData.map(
            (lead) => lead.id,
        );

        setLeads(leadData);

    }, 5000);

    return () => clearInterval(interval);

}, []);

    const grouped = useMemo(() => {

        const map: Record<number, Lead[]> = {};

        statuses.forEach((status) => {

            map[status.id] = [];

        });

        leads.forEach((lead) => {

            if (!map[lead.status.id]) {

                map[lead.status.id] = [];

            }

            map[lead.status.id].push(lead);

        });

        return map;

    }, [leads, statuses]);

    function handleDragStart(event: DragStartEvent) {

        const id = Number(
            String(event.active.id).replace("lead-", ""),
        );

        const lead = leads.find(
            (item) => item.id === id,
        );

        if (lead) {

            setActiveLead(lead);

        }

    }
    async function handleDragEnd(
    event: DragEndEvent,
) {

    setActiveLead(null);

    const { active, over } = event;

    if (!over) return;

    const leadId = Number(
        String(active.id).replace("lead-", ""),
    );

    const activeLead = leads.find(
        (l) => l.id === leadId,
    );

    if (!activeLead) return;

    let newStatus = activeLead.status.id;

    const overId = String(over.id);

    if (overId.startsWith("status-")) {

        newStatus = Number(
            overId.replace("status-", ""),
        );

    } else if (overId.startsWith("lead-")) {

        const targetLead = leads.find(
            (l) =>
                l.id === Number(
                    overId.replace("lead-", ""),
                ),
        );

        if (!targetLead) return;

        newStatus = targetLead.status.id;

    }

    if (newStatus === activeLead.status.id)
        return;

    const previousStatus = activeLead.status.id;

    setLeads((prev) =>
        prev.map((lead) =>
            lead.id === leadId
                ? {
                      ...lead,
                      status: {
                        ...lead.status,
                        id: newStatus,
                    },
                  }
                : lead,
        ),
    );

    try {

        await updateLeadStatus(
            leadId,
            newStatus,
        );

    } catch {

        setLeads((prev) =>
            prev.map((lead) =>
                lead.id === leadId
                    ? {
                          ...lead,
                          status: {
                            ...lead.status,
                            id: previousStatus,
                        },
                      }
                    : lead,
            ),
        );

    }

}

    function openLead(lead: Lead) {

        setSelectedLead(lead);

        setDrawerOpened(true);

    }

    if (loading) {

        return (
            <Center h={500}>
                <Loader />
            </Center>
        );

    }

    return (

        <>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >

                <Flex
                    gap="lg"
                    align="flex-start"
                    wrap="nowrap"
                    style={{
                        overflowX: "auto",
                        paddingBottom: 20,
                    }}
                >

                    {statuses.map((status) => (

                        <KanbanColumn
                            key={status.id}
                            statusId={status.id}
                            title={status.name}
                            leads={
                                grouped[status.id] ?? []
                            }
                            onLeadClick={openLead}
                        />

                    ))}

                </Flex>

                <DragOverlay>

                    {activeLead && (

                        <LeadCard
                            lead={activeLead}
                            onClick={() => {}}
                        />

                    )}

                </DragOverlay>

            </DndContext>

            <LeadDrawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                lead={selectedLead}
            />

        </>

    );

}