import { NativeEvents, Vegetable } from '@prisma/client';
import './date.extension'

type DynamicEvent = {
    title: string;
    start: string;
    end: string;
    eventCategory: string, 
    relatedVegetable: number,
    userId: string;
}

type DynamicCalendarParam = {
    selection: Vegetable[];
    climateIndex: number;
    calendars: string[];
    preferencesDays: string[];
    // week: number;
    year: number;
    nativeEvents: NativeEvents[] | undefined;
    userId: string;
}

const DateIso = ({week, year}:{week: number | undefined, year: number}) => {
    const simple = new Date(year, 0, 1 + (week! - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    // const day = (1 + (week!) * 7)
    // const ISOweekStart = new Date(year, 0, day)
    return {
        ISOweekStart
    }
}

const DynamicDayOfWeek = (preferences: number[]) => {
    const randomOfWeek = preferences[Math.floor(Math.random() * preferences.length)]

    return { randomOfWeek }
}

const DynamicDate = ({dateIso, randomOfWeek}: {dateIso: Date, randomOfWeek: number | undefined}) => {
    const dayOfMonth = dateIso.getDate()

    const dynamicDate = new Date(dateIso.setDate(dayOfMonth + randomOfWeek!))   

    return { dynamicDate }
}

export const DynamicCalendar = ({selection, climateIndex, preferencesDays, year, calendars, nativeEvents, userId}: DynamicCalendarParam) => {

    const preferencesDaysNumber = preferencesDays.map((prefDay: string)=> { return parseInt(prefDay) })
    const weekFinder = ({selectionId, climateIndex, nativeEvents, seedling, shelterSeedling}: {selectionId: number, climateIndex: number, nativeEvents: NativeEvents[]|undefined, seedling: boolean, shelterSeedling: boolean}) => {
    
        const native = nativeEvents && nativeEvents.find((native) => native.vegetableId === selectionId)
        if(seedling) return native && native.seedling + climateIndex
        if(shelterSeedling) return native && native?.shelterSeedling + climateIndex
    }
    
    const generate = () => {
    const arrayOfDates: DynamicEvent[] = []
    
    selection.map((vegetable) => {

    const seedling = calendars.includes("seedling")
    const shelterSeedling = calendars.includes("shelterSeedling")

    const weekSeedling = weekFinder({selectionId: vegetable.id, climateIndex: climateIndex, nativeEvents: nativeEvents, seedling: seedling, shelterSeedling: false})
    const weekShelterSeedling = weekFinder({selectionId: vegetable.id, climateIndex: climateIndex, nativeEvents: nativeEvents, seedling: false, shelterSeedling: shelterSeedling})

    const dateIso = DateIso({week: weekSeedling, year: year}).ISOweekStart
    const randomOfWeek = DynamicDayOfWeek(preferencesDaysNumber).randomOfWeek
    const baseDate = DynamicDate({dateIso: dateIso, randomOfWeek: randomOfWeek}).dynamicDate
    if(seedling === true){
    arrayOfDates.push({title: `Semis de ${vegetable.name}`, start: baseDate.toISOString(), end: baseDate.toISOString(), eventCategory: "semis", relatedVegetable: vegetable.id, userId: userId})
    }

    if(shelterSeedling === true){
    const dateIso = DateIso({week: weekShelterSeedling, year}).ISOweekStart
    const randomOfWeek = DynamicDayOfWeek(preferencesDaysNumber).randomOfWeek
    const shelterSeedlingDate = DynamicDate({dateIso: dateIso, randomOfWeek: randomOfWeek}).dynamicDate
    arrayOfDates.push({title: `Semis de ${vegetable.name}`, start: shelterSeedlingDate.toISOString(), end: shelterSeedlingDate.toISOString(), eventCategory: "semis sous abri", relatedVegetable: vegetable.id, userId: userId})  
    }

    const native = nativeEvents?.find((native) => native.vegetableId === vegetable.id)
    const germinationDays = native?.germination
    const plantationDays = native?.plantation
    const harvestDays = native?.harvest
    if(calendars.includes("germination")) { 
        arrayOfDates.push({title: `Germination ${vegetable.name}`, start: baseDate.addDays(germinationDays).toISOString(), 
        end: baseDate.addDays(germinationDays).toISOString(), eventCategory: "germination", relatedVegetable: vegetable.id, userId: userId}) 
    }
    if(calendars.includes("plantation")) { 
        arrayOfDates.push({title: `Plantation de ${vegetable.name}`, start: baseDate.addDays(plantationDays).toISOString(), end: baseDate.addDays(plantationDays).toISOString(), eventCategory: "plantation", relatedVegetable: vegetable.id, userId: userId}) 
    }
    if(calendars.includes("harvest")) {
        arrayOfDates.push({title: `Récolte de ${vegetable.name}`, start: baseDate.addDays(harvestDays).toISOString(), end: baseDate.addDays(harvestDays).toISOString(), eventCategory: "récolte", relatedVegetable: vegetable.id, userId: userId}) 
    }

})
    return arrayOfDates
    }

    // TESTS
    const weekTest = weekFinder({selectionId: 2, climateIndex: 0, nativeEvents, seedling: true, shelterSeedling: false})
    const dateIso = DateIso({week: weekTest, year:2023}).ISOweekStart
    const randomTheWeek = DynamicDayOfWeek([0,6]).randomOfWeek
    const dynDate = DynamicDate({dateIso: dateIso, randomOfWeek: randomTheWeek})
    const varTest = { selection, climateIndex, preferencesDays, calendars, nativeEvents }
    // TESTS
return { generate, weekTest, dateIso, randomTheWeek, dynDate, varTest }
}
