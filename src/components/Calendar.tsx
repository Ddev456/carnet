import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import { api } from "../utils/api";
import { Wizard } from "./Calendar/Wizard";
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
import { HiPlus } from 'react-icons/hi'
import { EventClickArg, EventInput } from "fullcalendar";
import { EventImpl } from "@fullcalendar/core/internal";

export const Calendar = () => {
    const query = api.event.getAll.useQuery<UseTRPCQueryOptions>(undefined, {refetchOnWindowFocus: false})
    const queryEvents = api.event.getEvents.useQuery<UseTRPCQueryOptions>(undefined, {refetchOnWindowFocus: false})

    const events = queryEvents.isSuccess && queryEvents.data || []

    const buildToolbar = () => {
        return {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listMonth,multiMonthYear'
        }
      }
      const { WizardModal, setShowWizardModal, setWizardType, setOnClickInfos } = useWizardModal();
   
      const handleAdd = () => {  setWizardType("ADD"); setShowWizardModal(true); }
      const handleAddOnDate = (onClickInfos: EventInput) => { setWizardType("ADDONDATE"); setOnClickInfos(onClickInfos); setShowWizardModal(true); }
      const handleUpdateOnEvent = (onClickInfos: EventInput) => { setWizardType("UPDATE"); setOnClickInfos(onClickInfos.toPlainObject()); setShowWizardModal(true); }
      const handleDynamic = () => {  setWizardType("DYNAMIC"); setShowWizardModal(true); } 
    return(
    <>
    <div className="flex justify-around p-2">
       <AnimatePresence>
       <motion.button
                  whileTap={{ scale: 0.6 }} transition={{duration: 0.3}} className="hidden md:flex justify-center items-center bg-lime-200 md:px-4 md:py-3
                  text-sm font-semibold text-center
                  rounded-md cursor-pointer
                hover:bg-lime-300"
                  onClick={handleAdd}
                >
                 <HiPlus/><span>Ajouter</span> 
                </motion.button>
                </AnimatePresence>
                <AnimatePresence>
                <motion.button whileTap={{ scale: 0.6 }} transition={{duration: 0.3}} className="hidden md:flex justify-center items-center bg-yellow-200 md:px-4 md:py-3
                text-sm font-semibold text-center
                rounded-md cursor-pointer
              hover:bg-yellow-300"
                  onClick={handleDynamic}
                  // {...FADE_IN_ANIMATION_SETTINGS}
                >
                <FcFlashAuto/><span className="ml-2">Générer</span>
                </motion.button>
            </AnimatePresence>
          </div>
        <WizardModal/>
      <div className="p-4">
        {query.isLoading && <div> Chargement .. </div>}
        { query?.data &&
        <FullCalendar
        locale={frLocale}
        headerToolbar={buildToolbar()}
        plugins={[ dayGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin ]}
        dateClick={handleAddOnDate}
        eventClick={handleUpdateOnEvent}
        initialView="dayGridMonth"
        events={events}
        />
        }
        </div>
    </>
    )
}