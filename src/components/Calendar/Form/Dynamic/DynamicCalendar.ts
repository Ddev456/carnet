import { NativeEvents, Vegetable } from '@prisma/client';
import './date.extension'

type DynamicEvent = {
    title: string;
    start: string;
    end: string;
    extendedProps: { eventCategory: string, relatedVegetable: number };
    userId: string;
}

type DynamicCalendarParam = {
    selection: Vegetable[];
    climateIndex: number;
    calendars: string[];
    preferencesDays: number[];
    // week: number;
    year: number;
    nativeEvents: NativeEvents[] | undefined;
    userId: string;
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

export const DynamicCalendar = ({selection, climateIndex, preferencesDays, year, calendars, nativeEvents, userId}: DynamicCalendarParam) => {

    const weekFinder = ({selectionId, climateIndex, nativeEvents, seedling, shelterSeedling}: {selectionId: number, climateIndex: number, nativeEvents: NativeEvents[]|undefined, seedling: boolean, shelterSeedling: boolean}) => {
    
        const native = nativeEvents?.find((native) => native.vegetableId === selectionId)
        if(seedling) return native?.nativeWeeks?.seedling[climateIndex]
        if(shelterSeedling) return native?.nativeWeeks?.shelterSeedling[climateIndex]
    }
    
    const generate = () => {
    let arrayOfDates: DynamicEvent[] = []
    
    selection.map((vegetable) => {

    const seedling = calendars.includes("seedling")
    const shelterSeedling = calendars.includes("shelterSeedling")

   const weekSeedling = weekFinder({selectionId: vegetable.id, climateIndex, nativeEvents, seedling: seedling, shelterSeedling: false})
   const weekShelterSeedling = weekFinder({selectionId: vegetable.id, climateIndex, nativeEvents, seedling: false, shelterSeedling: shelterSeedling})
    // Loop in this with selection


    const dateIso = DateIso({week: weekSeedling, year}).ISOweekStart
    const randomOfWeek = DynamicDayOfWeek(preferencesDays).randomOfWeek
    const baseDate = DynamicDate({dateIso: dateIso, randomOfWeek: randomOfWeek}).dynamicDate
    if(seedling){
    arrayOfDates.push({title: `Semis de ${vegetable.name}`, start: baseDate.toISOString(), end: baseDate.toISOString(), extendedProps: {eventCategory: "semis", relatedVegetable: vegetable.id}, userId: userId})
    }

    if(shelterSeedling){
    const dateIso = DateIso({week: weekShelterSeedling, year}).ISOweekStart
    const randomOfWeek = DynamicDayOfWeek(preferencesDays).randomOfWeek
    const shelterSeedlingDate = DynamicDate({dateIso: dateIso, randomOfWeek: randomOfWeek}).dynamicDate
    arrayOfDates.push({title: `Semis de ${vegetable.name}`, start: shelterSeedlingDate.toISOString(), end: shelterSeedlingDate.toISOString(), extendedProps: {eventCategory: "semis sous abri", relatedVegetable: vegetable.id}, userId: userId})  
    }
    // setArrayOfDates(arrayOfDates.concat([startDate]))
    // each calendar
    const native = nativeEvents?.find((native) => native.vegetableId === vegetable.id)
    const germinationDays = native?.germination
    const plantationDays = native?.plantation
    const harvestDays = native?.harvest
    if(calendars.includes("germination")) { 
        arrayOfDates.push({title: `Germination ${vegetable.name}`, start: baseDate.addDays(germinationDays).toISOString(), 
        end: baseDate.addDays(germinationDays).toISOString(), extendedProps: {eventCategory: "germination", relatedVegetable: vegetable.id}, userId: userId}) 
    }
    if(calendars.includes("plantation")) { 
        arrayOfDates.push({title: `Plantation de ${vegetable.name}`, start: baseDate.addDays(plantationDays).toISOString(), end: baseDate.addDays(plantationDays).toISOString(), extendedProps: {eventCategory: "plantation", relatedVegetable: vegetable.id}, userId: userId}) 
    }
    if(calendars.includes("harvest")) {
        arrayOfDates.push({title: `Récolte de ${vegetable.name}`, start: baseDate.addDays(harvestDays).toISOString(), end: baseDate.addDays(harvestDays).toISOString(), extendedProps: {eventCategory: "récolte", relatedVegetable: vegetable.id}, userId: userId}) 
    }
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
