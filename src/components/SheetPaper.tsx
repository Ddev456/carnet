import { Text, Paper } from '@mantine/core';

type SheetProps = {
    children: JSX.Element;
}

export const SheetPaper = ({children}: SheetProps) => {

  return (
    <Paper shadow="xl" radius="md" p="xl">
      <Text>Fiche de plante potagère n° {} - : </Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that require background
        with shadow
      </Text>
      { children }
    </Paper>
  );
}
