import { UnstyledButton, Checkbox, Text, Image, SimpleGrid, createStyles } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import { FcAssistant, FcAddressBook, FcAdvertising, FcAlarmClock } from 'react-icons/fc'

const useStyles = createStyles((theme, { checked }: { checked: boolean }) => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    transition: 'background-color 150ms ease, border-color 150ms ease',
    border: `1px solid ${
      checked
        ? theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).border
        : theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    backgroundColor: checked
      ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[8]
      : theme.white,
  },

  body: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
}));

interface ImageCheckboxProps {
  setEventCategory: any
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: string;
  image: string;
}

export function ImageCheckbox({
  setEventCategory,
  checked,
  defaultChecked,
  onChange,
  title,
  description,
  className,
  image,
  ...others
}: ImageCheckboxProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ImageCheckboxProps>) {
  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  const { classes, cx } = useStyles({ checked: value });

  return (
    <UnstyledButton
      {...others}
      onClick={() => handleChange(!value)}
      className={cx(classes.button, className)}
    >
      <Image src={image} alt={title} width={40} />

      <div className={classes.body}>
        <Text color="dimmed" size="xs" sx={{ lineHeight: 1 }} mb={5}>
          {description}
        </Text>
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
          {title}
        </Text>
      </div>

      <Checkbox
        checked={value}
        value={title}
        onChange={(event) => setEventCategory(event.target.value)}
        tabIndex={-1}
        styles={{ input: { cursor: 'pointer' } }}
      />
    </UnstyledButton>
  );
}

const mockdata = [
  { description: 'Sun and sea', title: 'Beach vacation', image: "imagecheckbox.png" },
  { description: 'Sightseeing', title: 'City trips', image: "imagecheckbox.png" },
  { description: 'Mountains', title: 'Hiking vacation', image: "imagecheckbox.png" },
  { description: 'Snow and ice', title: 'Winter vacation', image: "imagecheckbox.png" },
];

export function ImageCheckboxes({setEventCategory}: any) {
  const items = mockdata.map((item) => <ImageCheckbox setEventCategory={setEventCategory} {...item} key={item.title} />);
  return (<>
      <h4>Sélectionner une ou plusieurs catégories d'évènement</h4>
    <SimpleGrid
      cols={2}
      breakpoints={[
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'sm', cols: 1 },
      ]}
    >
      {items}
    </SimpleGrid>
    </>
  );
}