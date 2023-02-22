import { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Avatar,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import { keys } from '@mantine/utils';
import Link from 'next/link.js';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
  searchBar: {
    position: 'sticky',
    top: 0,
    transition: 'box-shadow 150ms ease'
  },
  header: {
    position: 'sticky',
    top: 45,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface RowData {
  id: number;
  name: string;
  icon: string;
  exposition: string;
  family: string;
  harvest: string;
  plantation: string;
  seedling: string;
  specie: string;
}

interface TableSortProps {
  data: RowData[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  const fields = ['name'] as const;
  return data.filter((item) =>
    fields.some((field) => item[field].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function TableSort({ data }: TableSortProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <tr key={row.name}>   
      <td>
        <Link href={`/legumotheque/fiche/${row.id}`}>
        <Avatar className='static' size={26} src={row.icon} radius={26} />
        <Text>{row.name}</Text>
        </Link>
      </td>
      <td>{row.family}</td>
      <td>{row.specie}</td>
      <td>{row.seedling}</td>
      <td>{row.plantation}</td>
      <td>{row.harvest}</td>
    </tr>
  ));

  return (
    <ScrollArea sx={{ height: 600 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <TextInput
        placeholder="Rechercher une plante potagère .."
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
        className={classes.searchBar}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ minWidth: 700 }}
      >
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Plante potagère
            </Th>
            <Th
              sorted={sortBy === 'family'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('family')}
            >
              Famille
            </Th>
            <Th
              sorted={sortBy === 'specie'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('specie')}
            >
              Espèce
            </Th>
            <Th
              sorted={sortBy === 'seedling'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('seedling')}
            >
              Semis
            </Th>
            <Th
              sorted={sortBy === 'plantation'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('plantation')}
            >
              Plantation
            </Th>
            <Th
              sorted={sortBy === 'harvest'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('harvest')}
            >
              Récolte
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}