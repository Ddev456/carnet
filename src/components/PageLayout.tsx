import React, { useState } from "react";
import { AppShell, Header, Text, MediaQuery, Burger, useMantineTheme, Group, Switch, useMantineColorScheme } from "@mantine/core";
import { Nav } from "./Nav";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { MediaQueryNav } from "./MediaQueryNav";
import { HeaderTabs } from "./Header";

const PageLayout = ({children}: any) => {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme()
    const [opened, setOpened] = useState(false)
    return (
    <AppShell
            padding="md"
            styles={{
                main: {
                    background:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0]
                }
            }}
            header={
            <HeaderTabs tabs={[{label: "Tableau de bord", link: "/", img: "https://img.icons8.com/color/48/null/home--v1.png"}, 
            {label: "Légumothèque", link: "/legumotheque", img: "https://img.icons8.com/color/48/null/courses.png"}, 
            {label: "Calendrier", link: "/calendrier", img: "https://img.icons8.com/color/48/null/calendar--v1.png"}]}/>
    }
    >{children}</AppShell>
    )

}

export default PageLayout