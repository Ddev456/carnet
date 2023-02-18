import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { useState } from "react";
import { Modal } from "@mantine/core";
import interactionPlugin from "@fullcalendar/interaction"
import { AddEventForm } from "./Calendar/AddEventForm";
import { api } from "../utils/api";
import { useSession } from "next-auth/react";
import { WizardAddEvent } from "./Calendar/WizardAddEvent";

export const Calendar = () => {
    const query = api.event.getAll.useQuery()
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
        // title="Introduce yourself!"
        >
            <WizardAddEvent>
                <AddEventForm event={eventOnClick}/>
            </WizardAddEvent>
        </Modal>
        {query.isLoading && <div> Chargement .. </div>}
        { query?.data &&
        <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        events={query.data[0]?.events}
        // events={[
        // { title: 'event 1', date: '2023-02-17' },
        // { title: 'event 2', date: '2023-02-19' }
        // ]}
        /> 
        }
    </>
    )
}