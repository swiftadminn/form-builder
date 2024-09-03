"use client"
import Image from "next/image";
import { GetFromStats } from "@/app/actions/form";
import { LucideView } from "lucide-react";
import {ReactNode, useEffect, useState} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
    return (
        <div className={"container pt-4"}>
            <CardStatsWrapper />
        </div>
    );
}

function CardStatsWrapper() {
    const [stats, setStats] = useState<Awaited<ReturnType<typeof GetFromStats>> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await GetFromStats();
            setStats(data);
            setLoading(false);
        };

        fetchStats();
    }, []);

    return <StatsCards loading={loading} data={stats} />;
}

interface StatsCardProps {
    data: Awaited<ReturnType<typeof GetFromStats>> | null;
    loading: boolean;
}

function StatsCards({ data, loading }: StatsCardProps) {
    return (
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Total Visits"
                icon={<LucideView className="text-blue-600" />}
                helperText="All time form visits"
                value={data?.visits.toLocaleString() || '0'}
                loading={loading}
                className="shadow-md shadow-blue-400"
            />

            <StatsCard
                title="Total submissions"
                icon={<LucideView className="text-yellow-600" />}
                helperText="All time form submissions"
                value={data?.submisson.toLocaleString() || '0'}
                loading={loading}
                className="shadow-md shadow-yellow-400"
            />

            <StatsCard
                title="Submissons Rate"
                icon={<LucideView className="text-green-600" />}
                helperText="Visits that result  in form submission"
                value={data?.submissionRate.toLocaleString() || '0'}
                loading={loading}
                className="shadow-md shadow-green-400"
            />
        </div>


    );
}

function StatsCard({
                       title,
                       value,
                       icon,
                       helperText,
                       loading,
                       className,
                   }: {
    title: string;
    value: string;
    icon: ReactNode;
    className: string;
    loading: boolean;
    helperText: string;
}) {
    return (
        <Card className={className}>
            <CardHeader className={"flex flex-row items-center justify-between bp-2"}>
                <CardTitle className={"text-sm font-medium text-muted-foreground"}>{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {loading ? <Skeleton><span className={"opacity-0"}>0</span></Skeleton> : value}
                </div>
                <div className="text-xs text-muted-foreground pt-1">{helperText}</div>
            </CardContent>
        </Card>
    );
}
