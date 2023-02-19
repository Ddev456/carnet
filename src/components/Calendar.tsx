import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { useState } from "react";
import { Modal } from "@mantine/core";
import interactionPlugin from "@fullcalendar/interaction"
import { api } from "../utils/api";
import { Wizard } from "./Calendar/Wizard";
import { useWizard } from "./Calendar/hooks/useWizard";

export const Calendar = () => {
    const query = api.event.getAll.useQuery()
    const { wizardType, opened, setOpened, handleDateClick, handleEventClick, dateOnClick, eventOnClick } = useWizard()
    
    return(
    <>
        <Modal
        size="auto"
        opened={opened}
        onClose={() => setOpened(false)}
        // title="Introduce yourself!"
        >
            <Wizard dateOnClick={dateOnClick} eventOnClick={eventOnClick} wizardType={wizardType}/>
        </Modal>
        {query.isLoading && <div> Chargement .. </div>}
        { query?.data &&
        <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={handleDateClick}
        eventClick={({event}) => handleEventClick(event.toPlainObject())}
        initialView="dayGridMonth"
        events={query.data[0]?.events}
        /> 
        }
    </>
    )
}