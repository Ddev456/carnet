import React, { useState } from "react";
import { AppShell, Header, Text, MediaQuery, Burger, useMantineTheme, Group, Switch, useMantineColorScheme } from "@mantine/core";
import { Nav } from "./Nav";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { MediaQueryNav } from "./MediaQueryNav";

const PageLayout = ({children}: any) => {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme()
    const [opened, setOpened] = useState(false)
    return (
    <AppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.lime[4]
                }
            }}
            navbar={<Nav opened={opened} hiddenBreakpoint="sm"/>}
            navbarOffsetBreakpoint="sm"
            header={
            <Header height={70} p="md">
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", height: "100%"}}>
                    {/* sm = 768px */}
                    <MediaQueryNav />
                    <Group className="hidden sm:block" position="center" my={30}>
                        <Switch
                            checked={colorScheme === 'dark'}
                            onChange={() => toggleColorScheme()}
                            size="lg"
                            onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
                            offLabel={<IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />}
                        />
                    </Group>
                </div>
            </Header>
    }
    >{children}</AppShell>
    )

}

export default PageLayout