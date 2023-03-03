import { WizardAddStepper } from "./WizardAddStepper"
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
                <WizardDynamicStepper setShowWizardModal={setShowWizardModal}/>
            )}
    }