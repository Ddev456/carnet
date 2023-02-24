// form-context.ts file

interface AddEventFormValues {
  title: string;
  eventCategory: string;
  relatedVegetable: {id: number, value: string};
  start: string;
  end: string;
}

// You can give context variables any name
export const [AddEventFormProvider,
  useAddEventFormContext, useAddEventForm] =
  createFormContext<AddEventFormValues>();