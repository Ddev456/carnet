import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useAddEventFormContext } from "../hooks/addEventForm-context";

export const DateInput = ({event}: any) => {
  const form = useAddEventFormContext();
  return (
    <>
      <DatePicker
                    name='start'
                    locale="fr"
                    placeholder="Date"
                    label="Choisir une date"
                    inputFormat="dddd, D MMMM, YYYY"
                    description="pour une tâche au potager .."
                    icon={<IconCalendar size={16} />}
                    defaultValue={event.event.date}
                    withAsterisk
                    {...form.getInputProps('start')}
                    />
    </>
  );
}