import { Accordion, createStyles } from '@mantine/core';
import { TiWeatherPartlySunny } from 'react-icons/ti'
import { FaTemperatureLow, FaSeedling } from 'react-icons/fa'

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderRadius: theme.radius.sm,
  },

  item: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    border: '1px solid transparent',
    position: 'relative',
    zIndex: 0,
    transition: 'transform 150ms ease',

    '&[data-active]': {
      transform: 'scale(1.03)',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },

  chevron: {
    '&[data-rotate]': {
      transform: 'rotate(-90deg)',
    },
  },
}));

export const AccordionSheet = () => {
  const { classes } = useStyles();
  return (
    <Accordion
      sx={{ maxWidth: 420 }}
      mx="auto"
      variant="filled"
      defaultValue="germination"
      classNames={classes}
      className={classes.root}
    >
            <Accordion.Item value="culture">
        <Accordion.Control icon={<TiWeatherPartlySunny />}>
          Conditions de culture
        </Accordion.Control>
        <Accordion.Panel>Content</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="germination">
        <Accordion.Control icon={<FaSeedling />}>
          Germination
        </Accordion.Control>
        <Accordion.Panel>Content</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="temperatures">
        <Accordion.Control icon={<FaTemperatureLow />}>
          Températures
        </Accordion.Control>
        <Accordion.Panel>Content</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}