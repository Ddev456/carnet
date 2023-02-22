import { createStyles, Button, Menu, Group, ActionIcon, Switch, useMantineColorScheme, Avatar } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { signOut } from "next-auth/react";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    button: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  
    menuControl: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      border: 0,
      borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
  }));

export const AvatarLinks = () => {

  const { classes, theme } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Group noWrap spacing={0}>
      
      <Menu transition="pop" position="bottom-end">
        <Menu.Target>
          <ActionIcon
            variant="filled"
            color={theme.primaryColor}
            size={36}
            className={classes.menuControl}
          >
            
            <Avatar color="cyan" radius="xl">MK</Avatar>
            <IconChevronDown size={16} stroke={1.5} />
            
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
                <button onClick={() => {
                signOut().catch(console.log)}}>
                Déconnexion
                </button>
          </Menu.Item>
          <Menu.Item>
            <Switch
                checked={colorScheme === 'dark'}
                onChange={() => toggleColorScheme()}
                size="lg"
                onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
                offLabel={<IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />}
            />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
