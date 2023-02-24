import { AddEventForm } from "./AddEventForm"
import { useWizard } from "./hooks/useWizard"
import { UpdateEventForm } from "./UpdateEventForm"
import { WizardAddStepper } from "./WizardAddStepper"
import { WizardWrapper } from "./WizardWrapper"

type WizardProps = {
    wizardType: string
    dateOnClick: any
    eventOnClick: any
}

export const Wizard = ({wizardType, dateOnClick, eventOnClick}: WizardProps) => {
        if(wizardType === 'ADD'){
            return (
            <WizardWrapper wizardType={wizardType}>
                <WizardAddStepper event={dateOnClick}/>
            </WizardWrapper>
            )}else if(wizardType === 'UPDATE'){
            return (
            <WizardWrapper wizardType={wizardType}>
                <UpdateEventForm event={eventOnClick}/>
            </WizardWrapper>
            )}else{
            return(
            <WizardWrapper wizardType={wizardType}>
                <AddEventForm event={dateOnClick}/>
            </WizardWrapper>
            )}
    }