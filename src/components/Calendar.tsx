import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
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
import Modal from "./Shared/Modal";
import { useWizardModal } from "./Layout/WizardModal";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "../../lib/constants";

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
      const { WizardModal, setShowWizardModal, setWizardType, setOnClickInfos } = useWizardModal();
   
      const handleAdd = () => {  setWizardType("ADD"); setShowWizardModal(true); }
      const handleAddOnDate = (onClickInfos: any) => { setWizardType("ADDONDATE"); setOnClickInfos(onClickInfos); setShowWizardModal(true); }
      const handleUpdateOnEvent = (onClickInfos: any) => { setWizardType("UPDATE"); setOnClickInfos(onClickInfos); setShowWizardModal(true); }
      const handleDynamic = () => {  setWizardType("DYNAMIC"); setShowWizardModal(true); } 
    return(
    <>
       <AnimatePresence>
       <motion.button
                  className="border-green-200 border p-1.5 px-4 text-sm text-white transition-all hover:bg-green-300 hover:text-black bg-green-500"
                  onClick={handleAdd}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Ajouter
                </motion.button>
       <motion.button
                  className="border-yellow-200 border p-1.5 px-4 text-sm text-white transition-all hover:bg-green-300 hover:text-black bg-yellow-500"
                  onClick={handleDynamic}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Générer
                </motion.button>
                </AnimatePresence>

        <WizardModal/>

        {query.isLoading && <div> Chargement .. </div>}
        { query?.data &&
        <FullCalendar
        locale={frLocale}
        headerToolbar={buildToolbar()}
        plugins={[ dayGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin ]}
        dateClick={handleAddOnDate}
        eventClick={({event}) => handleUpdateOnEvent(event.toPlainObject())}
        initialView="dayGridMonth"
        events={query.data[0]?.events}
        />
        }
    </>
    )
}