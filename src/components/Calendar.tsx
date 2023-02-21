import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { useState } from "react";
import { Modal } from "@mantine/core";
import interactionPlugin from "@fullcalendar/interaction"
import { api } from "../utils/api";
import { Wizard } from "./Calendar/Wizard";
import { useWizard } from "./Calendar/hooks/useWizard";
import listPlugin from "@fullcalendar/list"
import frLocale from '@fullcalendar/core/locales/fr';
import multiMonthPlugin from '@fullcalendar/multimonth'

export const Calendar = () => {
    const query = api.event.getAll.useQuery()
    const { wizardType, opened, setOpened, handleDateClick, handleEventClick, dateOnClick, eventOnClick } = useWizard()
    
    const buildToolbar = () => {
        return {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listMonth,multiMonthYear'
        }
      }

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
        locale={frLocale}
        headerToolbar={buildToolbar()}
        plugins={[ dayGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin ]}
        dateClick={handleDateClick}
        eventClick={({event}) => handleEventClick(event.toPlainObject())}
        initialView="dayGridMonth"
        events={query.data[0]?.events}
        /> 
        }
    </>
    )
}