import { NativeEvents } from '@prisma/client';
import './date.extension'

interface calendarsObject {
    seedling: boolean;
    shelterSeedling: boolean;
    germination: boolean;
    plantation: boolean;
    harvest: boolean;
}

type DynamicCalendarParam = {
    selection: number[];
    climateIndex: number;
    calendars: calendarsObject;
    preferencesDays: number[];
    // week: number;
    year: number;
    nativeEvents: NativeEvents[] | undefined
}



const DateIso = ({week, year}:{week: number, year: number}) => {
    var simple = new Date(year, 0, 1 + (week - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return {
        ISOweekStart
    }
}

const DynamicDayOfWeek = (preferences: number[]) => {
    const randomOfWeek = preferences[Math.floor(Math.random() * preferences.length)]

    return { randomOfWeek }
}

const DynamicDate = ({dateIso, randomOfWeek}: {dateIso: Date, randomOfWeek: number}) => {
    const dayOfMonth = dateIso.getDate()

    const dynamicDate = new Date(dateIso.setDate(dayOfMonth + randomOfWeek))   

    return { dynamicDate }
}

// Date.prototype.addDays = (days) =>{
//     const dayOfMonth = startDate.getDate()
//     return startDate.setDate(dayOfMonth + days)
// }

export const DynamicCalendar = ({selection, climateIndex, preferencesDays, year, calendars, nativeEvents}: DynamicCalendarParam) => {

    const weekFinder = ({selectionId, climateIndex, nativeEvents}: {selectionId: number, climateIndex: number, nativeEvents: NativeEvents[]|undefined}) => {
    
        const native = nativeEvents?.find((native) => native.vegetableId === selectionId)
        
        return native?.nativeWeeks?.seedling[climateIndex]
    }
    
    const generate = () => {
    let arrayOfDates: Date[] = []
    
    selection.map((vegetable) => {

   const week = weekFinder({selectionId: vegetable, climateIndex, nativeEvents})
    // Loop in this with selection
    const dateIso = DateIso({week, year}).ISOweekStart
    const randomOfWeek = DynamicDayOfWeek(preferencesDays).randomOfWeek
    const startDate = DynamicDate({dateIso, randomOfWeek}).dynamicDate
    arrayOfDates.push(startDate)
    // setArrayOfDates(arrayOfDates.concat([startDate]))
    // each calendar
    const native = nativeEvents?.find((native) => native.vegetableId === vegetable)
    const germinationDays = native?.germination
    if(calendars?.germination) { arrayOfDates.push(startDate.addDays(germinationDays)) }
    // if(calendars?.germination) { setArrayOfDates(arrayOfDates.concat([startDate.addDays(8)])) }
    // LOOP IN THIS WITH SELECTION
})
    return arrayOfDates
    }

return { generate }
}




// export const DynamicCalendar = ({preferencesDays, week, year}: DynamicCalendarProps) => {

// const dateIso = DateIso({week, year}).ISOweekStart
// const randomOfWeek = DynamicDayOfWeek(preferencesDays).randomOfWeek
// const generate = () => { const result = DynamicDate({dateIso, randomOfWeek}).dynamicDate
// return result
// }

// console.log(dateIso)

// return { generate }
// }
