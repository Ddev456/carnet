import { Input, TextInput } from "@mantine/core";
import { useAddEventFormContext } from "../hooks/addEventForm-context";

export const TitleInput = () => {
    const form = useAddEventFormContext();
  return (
    <>
        <Input.Wrapper
                id="input-title"
                withAsterisk
                label="Ajouter un titre d'évènement"
                description="Veuillez saisir un titre"
                // error="Le champ ne doit pas être vide !"
                >
            <TextInput id="input-title" name="title" placeholder="repiquer le semis .." {...form.getInputProps('title')}/>
        </Input.Wrapper>
    </>
  );
}