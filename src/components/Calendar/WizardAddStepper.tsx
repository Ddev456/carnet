import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TiTick } from "react-icons/ti";
import RadioInput from "./Form/RadioInput";
import { SearchInput } from "./Form/SearchInput";
import { TextInput } from "./Form/TextInput";

const Stepper = () => {
  const steps = ["Titre et date de l'évènement", "Plante potagère associée", "Catégorie d'évènement"];
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [complete, setComplete] = useState(false);
  const nestedInput = (step: number) => {

    switch(step) {
      case 1:
        return <TextInput />;
      case 2:
        return <SearchInput />;
      case 3:
        return <RadioInput />;
      // case 4:
      //   return ;
      default:
        break;
    }
  }
  return (
    <>
      <div className="flex justify-between p-6">
        
        {steps?.map((step, i) => (
          <>
          { steps.indexOf(step)+1 === currentStep ? <p className="text-gray-500">{step}</p> : <></> }
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
             
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
           
          </div>
        </>
        ))}
      </div>
      <div className="flex">
        { nestedInput(currentStep) }
        </div>
      {!complete && (
        <button
          className="text-white font-bold bg-blue-500 hover:bg-gradient-to-br 
          focus:outline-none rounded-lg px-5 py-2.5 text-center mr-2 mb-2 border-none"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Ajouter" : "Suivant"}
        </button>
      )}
    </>
  );
};

export default Stepper;

export const WizardAddStepper = (event: any) => {

type FormInputs = {
  title: string;
  eventCategory: string;
  relatedVegetable: { id: number, value: string };
  start: string;
  end: string;
};

const { register } = useForm<FormInputs>();

const methods = useForm({
    defaultValues: {
      title: "",
      eventCategory:"", 
      relatedVegetable:{id: 0, value: ""},
      start: "",
      end: ""
    },
  });

  const onSubmit = (data: any) => console.log(data);


  return (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Stepper />
            </form>
          </FormProvider>
        </>
      )
};


