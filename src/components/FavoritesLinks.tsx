import { ReactNode, useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, createStyles } from '@mantine/core';
import { FcOpenedFolder } from 'react-icons/fc';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react'
import { IconType } from 'react-icons';

const useStyles = createStyles((theme) => ({
    control: {
      fontWeight: 500,
      display: 'block',
      width: '100%',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      fontSize: theme.fontSizes.sm,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  
    link: {
      fontWeight: 500,
      display: 'block',
      textDecoration: 'none',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      paddingLeft: 31,
      marginLeft: 30,
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      borderLeft: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  
    chevron: {
      transition: 'transform 200ms ease',
    },
  }));

interface LinksGroupProps {
  icon: ReactNode;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <ThemeIcon variant={"outline"} size={30}> */}
              { Icon }
            {/* </ThemeIcon> */}
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const mockdata = {
  label: 'Mes Favoris',
  icon: <img src="https://img.icons8.com/bubbles/50/null/filled-star.png"/>,
  links: [
    { label: 'Tomate', link: '/' },
    { label: 'Betterave', link: '/' },
    { label: 'Laitue', link: '/' },
  ],
};

export const FavoritesLinks = () => {
  return (
    <Box
      sx={(theme) => ({
        minHeight: 220,
        padding: theme.spacing.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
      })}
    >
      <LinksGroup {...mockdata} />
    </Box>
  );
}