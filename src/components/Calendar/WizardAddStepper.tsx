import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TiTick } from "react-icons/ti";
import { RadioInput } from "./Form/RadioInput";
import { ComboboxInput } from "./Form/ComboboxInput";
import { TextInput } from "./Form/TextInput";
import { api } from "../../utils/api";
import { useWizardModal } from "../Layout/WizardModal";

const Stepper = ({complete, setComplete}: {complete: boolean, setComplete: Dispatch<SetStateAction<boolean>>}) => {
  
  const steps = ["Titre et date", "Plante associée", "Catégorie"];
  const [currentStep, setCurrentStep] = useState<number>(1);
  // const [complete, setComplete] = useState(false);
  const nestedInput = (step: number) => {

    switch(step) {
      case 1:
        return <TextInput />;
      case 2:
        return <ComboboxInput />;
      case 3:
        return <RadioInput />;
      default:
        break;
    }
  }
  return (
    <>
      <div className="w-full flex justify-center p-6">
        
        {steps?.map((step, i) => (
          <div key={i}>
          <div
            
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
            >
             
            <div className="step" >
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            { steps.indexOf(step)+1 === currentStep ? <p className="text-gray-500">{step}</p> : <></> }
           
          </div>
        </div>
        ))}
      </div>
      <div className="flex">
        { nestedInput(currentStep) }
        </div>
      {!complete && (
        <button
          className="mt-10 text-white font-bold bg-blue-500 hover:bg-gradient-to-br 
          focus:outline-none rounded-lg px-5 py-2.5 text-center mr-2 mb-2 border-none"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Suivant" : "Suivant"}
        </button>
      )}
     { complete === true && currentStep === steps.length && <button className="text-white font-bold bg-lime-500 hover:bg-gradient-to-br 
          focus:outline-none rounded-lg px-5 py-2.5 text-center mr-2 mb-2 border-none" type="submit">Ajouter au calendrier</button> }
    </>
  );
};

export default Stepper;

export const WizardAddStepper = ({setShowWizardModal, event}: {setShowWizardModal: Dispatch<SetStateAction<boolean>>, event: any}) => {
  const addEvent = api.event.postEvent.useMutation();

type FormInputs = {
  title: string;
  eventCategory: string;
  relatedVegetable: {};
  start: string;
  end: string;
};

const [complete, setComplete] = useState(false)

const { register } = useForm<FormInputs>();

const methods = useForm({
    defaultValues: {
      title: "",
      eventCategory:"", 
      relatedVegetable:{},
      start: "",
      end: ""
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    if(complete){
  addEvent.mutate({
    title: data.title,
    start: data.start,
    end: data.end,
    extendedProps: { eventCategory: data.eventCategory, relatedVegetable: data.relatedVegetable.id }
  })
  setShowWizardModal(false)
  }
  }
  return (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Stepper complete={complete} setComplete={setComplete}/>
            </form>
          </FormProvider>
        </>
      )
};


