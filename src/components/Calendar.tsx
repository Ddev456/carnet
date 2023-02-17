import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { useState } from "react";
import { Modal } from "@mantine/core";
import interactionPlugin from "@fullcalendar/interaction"

export const Calendar = () => {
    const [opened, setOpened] = useState(false);
    const handleDateClick = () => {
        setOpened(true)
    }
    return(
    <>
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        >
        {/* Modal content */}
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