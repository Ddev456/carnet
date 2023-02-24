import {
    Paper,
    Text,
    TextInput,
    Textarea,
    Button,
    Group,
    Stepper,
    SimpleGrid,
    createStyles,
    Input,
  } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import 'dayjs/locale/fr';
import { PickVegetableInput } from './PickVegetableInput';
import { api } from '../../utils/api';
import { useState } from 'react';
import { ImageCheckboxes } from './ImageCheckBox';

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
          

export const AddEventForm = (event: any) => {

  // STEPPER
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  // STEPPER

            const query = api.vegetable.getAll.useQuery();
            const [title, setTitle] = useState("")
            const [start, setStart] = useState(new Date(event.event.date))
            const [eventCategory, setEventCategory] = useState("")
            const [relatedVegetable, setRelatedVegetable] = useState(0)
            const { classes } = useStyles();
            const utils = api.useContext();
            const addEvent = api.event.postEvent.useMutation();
            return (
              <Paper shadow="md" radius="lg">
                <div className={classes.wrapper}>
          
                <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false}>
                    <Stepper.Step step={1} label="First step" description="Create an account">
                        Quel évènement voulez-vous ajouter ?
                        <Input.Wrapper
                        id="input-demo"
                        withAsterisk
                        label="Ajouter un titre d'évènement"
                        description="Veuillez saisir un titre"
                        error="Le champ ne doit pas être vide !"
                      >
                        <Input id="input-demo" placeholder="Tailler les framboisiers, repiquer le semis .." />
                      </Input.Wrapper>
                </Stepper.Step>
               
                <Stepper.Step state='stepInactive' step={2} label="Second step" description="Verify email">
                  <form className={classes.form} onSubmit={(event) => {
                  event.preventDefault();
                  addEvent.mutate({
                    title: title,
                    start: start.toISOString(),
                    end: new Date(start.getTime() + (1 * 60 * 60 * 1000)).toISOString(),
                    extendedProps: { eventCategory: eventCategory, relatedVegetable: relatedVegetable }
                  });
                  setTitle("")
                  setStart(new Date())
                  }}>
                    <Text size="lg" weight={700} className={classes.title}>
                      Ajouter un évènement
                    </Text>
          
                    <div className={classes.fields}>
                      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                        <TextInput type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)} label="Titre" 
                        placeholder="Titre de l'évènement" required/>
                        {/* <TextInput label="Your email" placeholder="hello@mantine.dev" required /> */}
                      </SimpleGrid>
          
                    { query.data && <PickVegetableInput relatedVegetable={relatedVegetable} setRelatedVegetable={setRelatedVegetable} dataInput={query.data}/> }
                    

                    <DatePicker
                    name='start'
                    onChange={(event: Date) => setStart(event)}
                    locale="fr"
                    placeholder="Date"
                    label="Choisir une date"
                    inputFormat="dddd, D MMMM, YYYY"
                    description="pour une tâche au potager .."
                    icon={<IconCalendar size={16} />}
                    defaultValue={event.event.date}
                    withAsterisk
                    />

                    <ImageCheckboxes setEventCategory={setEventCategory}/>
          
                      <Group position="right" mt="md">
                        <Button type="submit" className={classes.control}>
                          Ajouter
                        </Button>
                      </Group>
                    </div>
                  </form>
                  </Stepper.Step>
                  </Stepper>
                  <Group position="center" mt="xl">
                    <Button variant="default" onClick={prevStep}>Back</Button>
                    <Button onClick={nextStep}>Next step</Button>
                  </Group>
                </div>
              </Paper>
            );
          }