import { useEffect, useState } from "react";

import { Grid } from "@mantine/core";

import {
    IconBrandInstagram,
    IconChecklist,
    IconMessageCircle,
    IconUsers,
} from "@tabler/icons-react";

import StatisticCard from "../../components/statistics/StatisticCard";

import { getDashboard } from "../../api/dashboard";

export default function DashboardPage() {

    const [stats, setStats] = useState({
        leads: 0,
        tasks: 0,
        posts: 0,
        comments: 0,
    });

    useEffect(() => {

        getDashboard().then(setStats);

    }, []);

    return (

        <Grid>

            <Grid.Col span={3}>

                <StatisticCard
                    title="Leads"
                    value={stats.leads}
                    icon={<IconUsers size={26} />}
                />

            </Grid.Col>

            <Grid.Col span={3}>

                <StatisticCard
                    title="Tasks"
                    value={stats.tasks}
                    icon={<IconChecklist size={26} />}
                />

            </Grid.Col>

            <Grid.Col span={3}>

                <StatisticCard
                    title="Posts"
                    value={stats.posts}
                    icon={<IconBrandInstagram size={26} />}
                />

            </Grid.Col>

            <Grid.Col span={3}>

                <StatisticCard
                    title="Comments"
                    value={stats.comments}
                    icon={<IconMessageCircle size={26} />}
                />

            </Grid.Col>

        </Grid>

    );

}