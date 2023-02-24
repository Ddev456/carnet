import React, { useState } from "react";
import { AppShell, Header, Text, MediaQuery, Burger, useMantineTheme, Group, Switch, useMantineColorScheme } from "@mantine/core";
import { Nav } from "./Nav";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { MediaQueryNav } from "./MediaQueryNav";
import { HeaderTabs } from "./Header";
import {ImBooks} from 'react-icons/im'
import { AiOutlineHome } from 'react-icons/ai'
import { IoMdCalendar } from 'react-icons/io'

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
                            : theme.colors.indigo[0]
                }
            }}
            header={
            <HeaderTabs tabs={[{label: "Tableau de bord", link: "/", icon: <AiOutlineHome/>}, 
            {label: "Légumothèque", link: "/legumotheque", icon: <ImBooks/>}, 
            {label: "Calendrier", link: "/calendrier", icon: <IoMdCalendar/>}]}/>
    }
    >{children}</AppShell>
    )

}

export default PageLayout