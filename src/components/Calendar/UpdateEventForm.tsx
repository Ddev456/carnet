import {
    Paper,
    Text,
    TextInput,
    Textarea,
    Button,
    Group,
    SimpleGrid,
    createStyles,
  } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import 'dayjs/locale/fr';
import { PickVegetableInput } from './PickVegetableInput';
import { api } from '../../utils/api';

  const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan('sm');
          
        return {
              wrapper: {
                display: 'flex',
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                borderRadius: theme.radius.lg,
                padding: 4,
                border: `1px solid ${
                  theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
                }`,
          
                [BREAKPOINT]: {
                  flexDirection: 'column',
                },
              },
          
              form: {
                boxSizing: 'border-box',
                flex: 1,
                padding: theme.spacing.xl,
                paddingLeft: theme.spacing.xl * 2,
                borderLeft: 0,
          
                [BREAKPOINT]: {
                  padding: theme.spacing.md,
                  paddingLeft: theme.spacing.md,
                },
              },
          
              fields: {
                marginTop: -12,
              },
          
              fieldInput: {
                flex: 1,
          
                '& + &': {
                  marginLeft: theme.spacing.md,
          
                  [BREAKPOINT]: {
                    marginLeft: 0,
                    marginTop: theme.spacing.md,
                  },
                },
              },
          
              fieldsGroup: {
                display: 'flex',
          
                [BREAKPOINT]: {
                  flexDirection: 'column',
                },
              },
          
              contacts: {
                boxSizing: 'border-box',
                position: 'relative',
                borderRadius: theme.radius.lg - 2,
                // backgroundImage: `url(${bg.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid transparent',
                padding: theme.spacing.xl,
                flex: '0 0 280px',
          
                [BREAKPOINT]: {
                  marginBottom: theme.spacing.sm,
                  paddingLeft: theme.spacing.md,
                },
              },
          
              title: {
                marginBottom: theme.spacing.xl * 1.5,
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          
                [BREAKPOINT]: {
                  marginBottom: theme.spacing.xl,
                },
              },
          
              control: {
                [BREAKPOINT]: {
                  flex: 1,
                },
              },
            };
          });
          

export const UpdateEventForm = (event: any) => {
  const query = api.vegetable.getAll.useQuery();
            const { classes } = useStyles();
            
            return (
              <Paper shadow="md" radius="lg" style={{width: '600px'}}>
                <div className={classes.wrapper}>
          
                  <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
                    <Text size="lg" weight={700} className={classes.title}>
                      Mettre ?? jour un ??v??nement
                    </Text>
          
                    <div className={classes.fields}>
                      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                        <TextInput label="Your name" placeholder="Your name" />
                        <TextInput label="Your email" placeholder="hello@mantine.dev" required />
                      </SimpleGrid>
          
                    { query.data && <PickVegetableInput dataInput={query.data}/> }
                      
                    <DatePicker
                    locale="fr"
                    placeholder="Date"
                    label="Choisir une date"
                    inputFormat="dddd, D MMMM, YYYY"
                    description="pour une t??che au potager .."
                    icon={<IconCalendar size={16} />}
                    defaultValue={new Date(event.event.start)}
                    withAsterisk
                    />

          
                      <Textarea
                        mt="md"
                        label="Your message"
                        placeholder="Please include all relevant information"
                        minRows={3}
                      />
          
                      <Group position="right" mt="md">
                        <Button type="submit" className={classes.control}>
                          Mettre ??  jour
                        </Button>
                      </Group>
                    </div>
                  </form>
                </div>
              </Paper>
            );
          }