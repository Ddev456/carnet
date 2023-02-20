import { useState } from 'react';
import { createStyles, Navbar, Group, Code, MantineNumberSize } from '@mantine/core';
import {
  IconHome,
  IconSeeding,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconCalendar,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import { FcCalendar, FcHome, FcAcceptDatabase } from 'react-icons/fc'
import { signOut } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router.js';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    link: {
      // ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.colors.lime[1],
        color: theme.colors.lime[7],
        [`& .${icon}`]: {
          color:theme.colors.lime[7],
        },
      },
    },
  };
});

const data = [
  { link: '/', label: 'Dashboard', icon: IconHome },
  { link: '/legumotheque', label: 'Légumothèque', icon: IconSeeding },
  { link: '/calendrier', label: 'Calendrier', icon: IconCalendar },
  // { link: '', label: 'SSH Keys', icon: IconKey },
  // { link: '', label: 'Databases', icon: IconDatabaseImport },
  // { link: '', label: 'Authentication', icon: Icon2fa },
  // { link: '', label: 'Other Settings', icon: IconSettings },
];

export const Nav = ({opened, hiddenBreakpoint}: {opened: boolean; hiddenBreakpoint: MantineNumberSize}) => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');

  const router = useRouter()
console.log(router.pathname);

  const links = data.map((item, index) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: router.pathname === item.link })}
      href={item.link}
      key={index}
      // onClick={(event) => {
      //   event.preventDefault();
      //   setActive(item.label);
      // }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Navbar hiddenBreakpoint={hiddenBreakpoint} hidden={!opened} width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-seeding" width="76" height="76" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7bc62d" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" />
        <path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" />
        <line x1="12" y1="20" x2="12" y2="10" />
        </svg>
        {/* <img width={120} src="logocp.png" alt="" /> */}
          <Code sx={{ fontWeight: 700 }}>v0.1.1</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        {/* <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a> */}

        <button className={classes.link} onClick={() => {
        signOut().catch(console.log)}}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Déconnexion</span>
        </button>
      </Navbar.Section>
    </Navbar>
  );
}