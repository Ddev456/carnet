import { AddEventForm } from "./AddEventForm"
import { UpdateEventForm } from "./UpdateEventForm"
import { WizardAddStepper } from "./WizardAddStepper"
import { BiCodeBlock } from "react-icons/bi"
import { WizardUpdateStepper } from "./WizardUpdateStepper"
import { WizardDynamicStepper } from "./WizardDynamicStepper"
import { Dispatch, SetStateAction } from "react"

type WizardProps = {
    wizardType: string
    onClickInfos?: any
    setShowWizardModal: Dispatch<SetStateAction<boolean>>
}

export const Wizard = ({wizardType, onClickInfos, setShowWizardModal}: WizardProps) => {
        if(wizardType === 'ADD'){
            return (
                <WizardAddStepper setShowWizardModal={setShowWizardModal} event={onClickInfos}/>
            )}else if(wizardType === 'UPDATE'){
            return (
                <WizardUpdateStepper/>
            )}else{
                console.log('ici');
                
            return(
                <WizardDynamicStepper/>
            )}
    }