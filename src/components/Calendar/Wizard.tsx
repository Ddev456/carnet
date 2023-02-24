import { AddEventForm } from "./AddEventForm"
import { UpdateEventForm } from "./UpdateEventForm"
import { WizardAddStepper } from "./WizardAddStepper"


type WizardProps = {
    wizardType: string
    onClickInfos?: any
}

export const Wizard = ({wizardType, onClickInfos}: WizardProps) => {
        if(wizardType === 'ADD'){
            return (
                <WizardAddStepper event={onClickInfos}/>
            )}else if(wizardType === 'UPDATE'){
            return (
                <></>
            )}else{
            return(
                <></>
            )}
    }