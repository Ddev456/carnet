import { useState } from 'react';
import { createStyles, Navbar, Group, Image, MantineNumberSize, Box } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AvatarLinks } from './AvatarLinks';

const useStyles = createStyles((theme, _params, getRef) => {
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
      display: 'flex',
      flexDirection: 'row',
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
      },
    },

    linkIcon: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.colors.gray[1],
        color: theme.colors.gray[7],
      },
    },
  };
});

const data = [
  { link: '/', label: 'Dashboard', icon: <img src="https://img.icons8.com/bubbles/50/null/home-page.png"/> },
  { link: '/legumotheque', label: 'Légumothèque', icon: <img src="https://img.icons8.com/bubbles/50/null/today.png"/> },
  { link: '/calendrier', label: 'Calendrier', icon: <img src="https://img.icons8.com/bubbles/50/null/sprout.png"/> },
];

export const MediaQueryNav = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');
  const router = useRouter()
  console.log(router.pathname);

  const links = data.map((item, index) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: router.pathname === item.link })}
      href={item.link}
      key={index}>
          { item.icon }
    </Link>
  ));

  return (
        <div className='md:hidden flex'>
            {links}
            <AvatarLinks />
        </div>
  );
}