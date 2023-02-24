import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { Box, Button, Modal } from "@mantine/core";
import interactionPlugin from "@fullcalendar/interaction"
import { api } from "../utils/api";
import { Wizard } from "./Calendar/Wizard";
import { useWizard } from "./Calendar/hooks/useWizard";
import listPlugin from "@fullcalendar/list"
import frLocale from '@fullcalendar/core/locales/fr';
import multiMonthPlugin from '@fullcalendar/multimonth'
import { UseTRPCQueryOptions } from "../pages/legumotheque/index";
import { FcFlashAuto } from 'react-icons/fc'
import { TbLayoutGridAdd } from 'react-icons/tb'

export const Calendar = () => {
    const query = api.event.getAll.useQuery<UseTRPCQueryOptions>(undefined, {refetchOnWindowFocus: false})
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
        <Box className="flex justify-around mb-3">
          <Button className="__button__lime" leftIcon={<TbLayoutGridAdd />} variant="light" color="lime" size="lg" compact>
            Ajouter
          </Button>
          <Button leftIcon={<FcFlashAuto />} variant="outline" color="yellow" size="lg" compact>
            Générer
          </Button>
          </Box>
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