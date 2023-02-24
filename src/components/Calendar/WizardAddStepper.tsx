import { Button, Input, Stepper, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React, { useState } from "react";
import { api } from "../../utils/api";
import { AddEventFormProvider, useAddEventForm, useAddEventFormContext } from "./hooks/addEventForm-context";
import { ImageCheckboxes } from "./ImageCheckBox";
import { PickVegetableInput } from "./PickVegetableInput";
import { IconCalendar } from '@tabler/icons-react';
import { TitleInput } from "./Form/TitleInput";
import { VegetableInput } from "./Form/VegetableInput";
import { CategoryInput } from "./Form/CategoryIput";
import { DateInput } from "./Form/DateInput";

export const WizardAddStepper = (event: any) => {

function getSteps() {
  return [
    "Évènement",
    "Plante potagère associée",
    "Catégorie",
    "Date de l'évènement",
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <TitleInput />;
    case 1:
      return <VegetableInput />;
    case 2:
      return <CategoryInput />;
    case 3:
      return <DateInput event={event} />;
    default:
      return "unknown step";
  }
}

  const methods = useAddEventForm({
    initialValues: {
      title: "",
      eventCategory:"", 
      relatedVegetable:{id: 0, value: ""},
      start: "",
      end: ""
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState<number[]>([]);
  const steps = getSteps();

  const isStepOptional = (step: number) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step: number) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data: any) => {
    console.log(data);
    if (activeStep == steps.length - 1) {
      console.log('terminé');
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <div>
      <Stepper active={activeStep}>
        {steps.map((step, index) => {
          switch (step) {
            case '0': return (<Stepper.Step key={index} label="évènement" description="Ajouter un titre"> {step}
            </Stepper.Step>)
              break;
            case '1': return (<Stepper.Step key={index} label="Plante potagère associée" description="Ajouter une plante"> {step}
            </Stepper.Step>)
              break;
            case '2': return (<Stepper.Step key={index} label="Catégorie" description="Ajouter une catégorie"> {step}
            </Stepper.Step>)
              break;
            case '3': return (<Stepper.Step key={index} label="Date" description="Ajouter une Date"> {step}
            </Stepper.Step>)
              break;
            default:
              break;
          }
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <h3>
          Thank You
        </h3>
      ) : (
        <>
          <AddEventFormProvider form={methods}>
            <form onSubmit={methods.onSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Retour
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  onClick={handleSkip}
                >
                  Passer
                </Button>
              )}
              <Button
                color="primary"
                // onClick={handleNext}
                type="submit"
              >
                {activeStep === steps.length - 1 ? "Ajouter" : "Suivant"}
              </Button>
            </form>
          </AddEventFormProvider>
        </>
      )}
    </div>
  );
};