import { AddEventForm } from "./AddEventForm"
import { UpdateEventForm } from "./UpdateEventForm"
import { WizardAddStepper } from "./WizardAddStepper"
import { BiCodeBlock } from "react-icons/bi"
import { WizardUpdateStepper } from "./WizardUpdateStepper"
import { WizardDynamicStepper } from "./WizardDynamicStepper"

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
                <WizardUpdateStepper/>
            )}else{
                console.log('ici');
                
            return(
                <WizardDynamicStepper/>
            )}
    }