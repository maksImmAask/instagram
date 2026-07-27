import { useEffect, useState } from "react";
import { Card, Grid, Text, Title } from "@mantine/core";

import { getLeads, type Lead } from "../../api/leads";

export default function LeadsPage() {

    const [leads, setLeads] = useState<Lead[]>([]);

    useEffect(() => {
        getLeads().then(setLeads);
    }, []);
    useEffect(() => {
    getLeads()
        .then((data) => {
            console.log("Leads:", data);
            setLeads(data);
        })
        .catch((error) => {
            console.error(error);
        });
}, []);
    console.log("State:", leads);
    return (
        <>
            <Title order={2} mb="lg">
                Leads
            </Title>

            <Grid>

                {leads.map((lead) => (

                    <Grid.Col
                        key={lead.id}
                        span={4}
                    >

                        <Card
                            shadow="sm"
                            withBorder
                            radius="md"
                            p="lg"
                        >

                            <Text fw={600}>
                                Lead #{lead.id}
                            </Text>

                            <Text size="sm" c="dimmed">
                                Status: {lead.status}
                            </Text>

                            <Text size="sm" c="dimmed">
                                Manager: {lead.manager ?? "-"}
                            </Text>

                        </Card>

                    </Grid.Col>

                ))}

            </Grid>
        </>
    );
}