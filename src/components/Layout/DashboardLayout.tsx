import { ReactNode } from "react"
import UserDropdown from "./UserDropdown"
import { FaSeedling } from 'react-icons/fa'
import { RxHome, RxCalendar, RxBookmarkFilled } from 'react-icons/rx'
import Link from "next/link"
import { HiPlus } from 'react-icons/hi'
import { AnimatePresence, motion } from "framer-motion"
import { CollapsibleMenu } from "./CollapsibleMenu"

const DashboardLayout = ({children}: {children: ReactNode}) => {
    return (
    <div className="grid grid-rows-6 grid-cols-6 h-screen bg-lime-50">
         <div className="flex md:h-full md:flex-col md:col-span-1 md:row-start-1 md:row-end-7 justify-around items-center overflow-x-hidden border
         flex-row col-start-1 col-end-7 row-span-6">
            <div className="logo hidden md:block">
                {/* <FaSeedling/> */}
                <span className="hidden md:block">Carnet Potager</span></div>
            <AnimatePresence>
            <motion.button whileTap={{ scale: 0.6 }} transition={{duration: 0.3}} className="hidden md:flex justify-center items-center bg-lime-200 md:px-4 md:py-3
    text-sm font-semibold text-center
    rounded-md cursor-pointer
    hover:bg-lime-300 md:w-4/5"><HiPlus/> <span className="ml-2 hidden md:block">Ajouter</span></motion.button>
    </AnimatePresence>
            <ul className="flex items-center md:flex-col md:h-4/6 w-full">
                <li className="w-4/5"><Link className="flex items-center px-4 py-3 font-semibold hover:bg-lime-100 rounded-md" href="/dashboard"><RxHome className="text-4xl md:text-xl"/><span className="ml-2 hidden xl:block">Tableau de bord</span></Link></li>
                <li className="w-4/5"><Link className="flex items-center px-4 py-3 font-semibold hover:bg-lime-100 rounded-md" href="/legumotheque"><RxBookmarkFilled className="text-4xl md:text-xl"/><span className="ml-2 hidden xl:block">Légumothèque</span></Link></li>
                <li className="w-4/5"><Link className="flex items-center px-4 py-3 font-semibold hover:bg-lime-100 rounded-md" href="/calendrier"><RxCalendar className="text-4xl md:text-xl"/><span className="ml-2 hidden xl:block">Calendrier</span></Link></li>
                <li className="w-4/5"><CollapsibleMenu /></li>
            </ul>
            <UserDropdown />
        </div>
        <main className="md:col-start-2 md:col-end-7 md:row-start-1 md:row-end-7 md:h-full col-start-1 col-end-7 row-start-1 row-end-6">{children}</main>
            
       
    </div>
    )

}

export default DashboardLayout