import { useState } from 'react';
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  Header,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


const useStyles = createStyles((theme) => ({
  header: {
    // paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
  },

  // mainSection: {
  //   paddingBottom: theme.spacing.sm,
  // },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  // tabs: {
  //   [theme.fn.smallerThan('sm')]: {
  //     display: 'none',
  //   },
  // },

  tabsList: {
    borderBottom: '0 !important',
  },

  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },

    '&[data-active]': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.indigo[0],
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
    },
  },
}));

type tab = {
        label: string;
        link: string;
        icon: JSX.Element;
}

interface HeaderTabsProps {
  tabs: tab[];
}

export function HeaderTabs({ tabs }: HeaderTabsProps) {
  const router = useRouter()
  const { data: session, status } = useSession();
  const user = session?.user
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = tabs.map((tab) => (
    <Link href={tab.link} key={tab.label}>
      <Tabs.Tab value={tab.link} icon={tab.icon} className="text-4xl sm:text-lg">
        <span className='hidden sm:block'>{tab.label}</span>
      </Tabs.Tab>
    </Link> 
  ));

  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <Header height={{ base: 80, md: 90 }} position={matches ? {top: 0} : {bottom:0}} className={classes.header}>
      <Container>
        <Group position="apart">
          <Text color="lime.6" className='__logo hidden sm:block text-2xl'>Carnet Potager.</Text>
          <div className='flex'>
          </div>
          {/* <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" /> */}

          <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                <Avatar color="cyan" radius="xl" size={30}>{user?.name?.charAt(0).toUpperCase()}</Avatar>
                  {/* <Avatar src={user.image} alt={user.name} radius="xl" size={20} /> */}
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {user?.name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconStar size={14} color={theme.colors.yellow[6]} stroke={1.5} />}>
                Plantes Favorites
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Param??tres</Menu.Item>
              <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
                Changer de compte
              </Menu.Item>
              <Menu.Item icon={<IconLogout size={14} stroke={1.5} />} onClick={() => { signOut().catch(console.log)}}>D??connexion</Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
                Supprimer le compte
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container>
        <Tabs
          defaultValue={router.pathname}
          variant="outline"
          classNames={{
            // root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </Header>
  );
}