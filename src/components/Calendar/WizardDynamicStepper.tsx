import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TiTick } from "react-icons/ti";
import { RadioInput } from "./Form/RadioInput";
import { ComboboxInput } from "./Form/ComboboxInput";
import { TextInput } from "./Form/TextInput";
import { api } from "../../utils/api";
import { SelectionStep } from "./Form/Dynamic/SelectionStep";
import { ClimateStep } from "./Form/Dynamic/ClimateStep";
import { PreferencesStep } from "./Form/Dynamic/PreferencesStep";
import { DynamicCalendar } from "./Form/Dynamic/DynamicCalendar";
import { Prisma, Vegetable } from "@prisma/client";
import { useSession } from "next-auth/react";
import { UseQueryOptions } from "@tanstack/react-query";

interface UseTRPCQueryOptions extends UseQueryOptions{
  trpc: {
    refetchOnWindowFocus: boolean;
  }
}


const Stepper = ({complete, setComplete}: {complete: boolean, setComplete: Dispatch<SetStateAction<boolean>>}) => {
  
  const steps = ["Sélection", "Climat", "Préférences"];
  const [currentStep, setCurrentStep] = useState<number>(1);
  // const [complete, setComplete] = useState(false);
  const nestedInput = (step: number) => {

    switch(step) {
      case 1:
        return <SelectionStep />;
      case 2:
        return <ClimateStep />;
      case 3:
        return <PreferencesStep />;
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
            className = { (currentStep === i + 1) ? "step-item active": "step-item complete"} 
            // className={`step-item ${currentStep === i + 1} active ${
            //   (i + 1 < currentStep || complete)} complete`}
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
          focus:outline-none rounded-lg px-5 py-2.5 text-center mr-2 mb-2 border-none">Ajouter au calendrier</button> }
    </>
  );
};

export default Stepper;

export const WizardDynamicStepper = ({setShowWizardModal}: {setShowWizardModal: Dispatch<SetStateAction<boolean>>}) => {

  const {data: Session} = useSession()
  const id = Session?.user.id
  const queryNativeEvents = api.nativeEvents.getAll.useQuery<UseTRPCQueryOptions>(undefined, {enabled: !!id, refetchOnWindowFocus: false})
  const addEvent = api.event.dynamicEvent.useMutation();
  const nativeEvents = queryNativeEvents.data
  
type FormInputs = {
  selection: Vegetable[];
  climateIndex: number;
  preferencesDays: string[];
  preferencesCalendar: string[];
};

const [complete, setComplete] = useState(false)

const { register } = useForm<FormInputs>();

const methods = useForm({
    defaultValues: {
      selection: [],
      climateIndex: 0, 
      preferencesDays: [],
      preferencesCalendar: []
    },
  });

  const onSubmit = (data: FormInputs) => {

    if(complete === true){
      const userId = Session!.user.id

      // TESTS !!!!!!!!!!!!!!!!!!!
      // const input = DynamicCalendar({selection: data.selection, climateIndex: data.climateIndex, preferencesDays: data.preferencesDays, year: (new Date().getFullYear()), calendars: data.preferencesCalendar, nativeEvents: nativeEvents, userId: userId}).generate()
      // console.log(DynamicCalendar({selection: data.selection, climateIndex: data.climateIndex, preferencesDays: data.preferencesDays, year: (new Date().getFullYear()), calendars: data.preferencesCalendar, nativeEvents: nativeEvents, userId: userId}).generate())
      console.log(DynamicCalendar({selection: data.selection, climateIndex: data.climateIndex, preferencesDays: data.preferencesDays, year: (new Date().getFullYear()), calendars: data.preferencesCalendar, nativeEvents: nativeEvents, userId: userId}).generate())
      // addEvent.mutate(input)
      // setShowWizardModal(false)
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


