"use client"

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {MoonIcon, SunIcon} from "lucide-react";

function ThemeSwitcher() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    },[])

    if (!mounted) return null;
    return <Tabs defaultValue={theme}>
        <TabsList className="border">
            <TabsTrigger
            value={"light"}
            onClick={() => setTheme("system")}
            >
                <SunIcon className={"h-[1.2rem] w-[1.2rem]"}/>
            </TabsTrigger>
            <TabsTrigger
                value={"dark"}
                onClick={() => setTheme("dark")}
            >
                <MoonIcon className={"h-[1.2rem] w-[1.2rem] rotate-0 transition-all dark:rotate-0"}/>
            </TabsTrigger>

        </TabsList>
    </Tabs>
}
export default ThemeSwitcher