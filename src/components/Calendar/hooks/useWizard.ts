import { useState } from "react"

export const useWizard = () => {
    const [opened, setOpened] = useState(false);
    const [dateOnClick, setDateOnClick] = useState<any>()
    const [eventOnClick, setEventOnClick] = useState<any>()
    const [wizardType, setWizardType] = useState("ADD")
    const handleDateClick = (eventClickInfo: any) => {
        setDateOnClick(eventClickInfo)
        setWizardType("ADD")
        setOpened(true)
    }

    const handleEventClick = (eventClickInfo: any) => {
        console.log(eventClickInfo);
        setEventOnClick(eventClickInfo)
        setWizardType("UPDATE")
        setOpened(true)
    }
    return {
        wizardType,
        setWizardType,
        opened,
        setOpened,
        dateOnClick,
        setDateOnClick,
        handleDateClick,
        handleEventClick,
        eventOnClick,
        setEventOnClick
    }
}