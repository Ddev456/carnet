import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { useState } from "react";
import { Modal } from "@mantine/core";
import interactionPlugin from "@fullcalendar/interaction"
import { AddEventForm } from "./Calendar/AddEventForm";

export const Calendar = () => {
    const [opened, setOpened] = useState(false);
    const [eventOnClick, setEventOnClick] = useState<any>()
    const handleDateClick = (eventClickInfo: any) => {
        setEventOnClick(eventClickInfo)
        setOpened(true)
    }
    return(
    <>
        <Modal
        size="auto"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        >
          <AddEventForm event={eventOnClick}/>
        </Modal>
        <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        events={[
        { title: 'event 1', date: '2023-02-17' },
        { title: 'event 2', date: '2023-02-19' }
        ]}
        />
    </>
    )
}