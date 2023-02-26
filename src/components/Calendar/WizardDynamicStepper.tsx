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

export const WizardDynamicStepper = ({setShowWizardModal}: {setShowWizardModal: Dispatch<SetStateAction<boolean>>}) => {

  const queryNativeEvents = api.nativeEvents.getAll.useQuery()
  const addEvent = api.event.dynamicEvent.useMutation();
  const nativeEvents = queryNativeEvents.data
  console.log(nativeEvents);
  const {data: Session} = useSession()
  const [dynamic, setDynamic] = useState<string[]>([''])

// !!!!!!!!!!!!!!

  // const dateIsoWeekStart =(DynamicCalendar({week:15, year:2023}).ISOweekStart)
  // const pref = [2,4,6]
  // const dayOfWeek = Math.floor(Math.random() * pref.length)
  // const randomOfWeek = pref[dayOfWeek-1]


// !!!!!!!!!!!!!!!
// const dayofmonth = dateIsoWeekStart.getDate()
//   console.log(new Date(dateIsoWeekStart.setDate(dayofmonth + randomOfWeek)));
  // SOLUTION
  
type FormInputs = {
  selection: Vegetable[];
  climateIndex: number;
  preferencesDays: number[];
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

  const onSubmit = (data: any) => {
    console.log(data);
    
    if(complete === true){
      const userId = Session?.user.id
      const prefDays: number[] = data.preferencesDays.map((pref: string)=> { return parseInt(pref) })

      // console.log(DynamicCalendar({selection: data.selection, climateIndex: data.climateIndex, preferencesDays: prefDays, year: (new Date().getFullYear()), calendars: data.preferencesCalendar, nativeEvents, userId}).generate())
      // console.log(DynamicCalendar({selection: data.selection, climateIndex: data.climateIndex, preferencesDays: prefDays, year: (new Date().getFullYear()), calendars: data.preferencesCalendar, nativeEvents, userId}).dynDate)
      const input = DynamicCalendar({selection: data.selection, climateIndex: data.climateIndex, preferencesDays: prefDays, year: (new Date().getFullYear()), calendars: data.preferencesCalendar, nativeEvents, userId}).generate()
      
      addEvent.mutate(input)
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


