import { useState } from "react"
import { useForm, useFormContext } from "react-hook-form"

export const PreferencesStep = () => {


  const { register } = useFormContext()

  return (
    <div className="flex flex-col">
<div className="container">
    <h2>Jours de jardinage au potager</h2>
  <div className="flex flex-wrap">
    <div className="flex items-start space-x-3 py-6">
      <input {...register('preferencesDays')} value={0} type="checkbox" className="border-gray-300 rounded h-5 w-5" />

      <div className="flex flex-col">
        <h1 className="text-gray-700 font-medium leading-none">Lundi</h1>
        
      </div>
    </div>

    <div className="flex items-start space-x-3 py-6">
      <input {...register('preferencesDays')} value={1} type="checkbox" className="border-gray-300 rounded h-5 w-5" />

      <div className="flex flex-col">
        <h1 className="text-gray-700 font-medium leading-none">Mardi</h1>
        
      </div>
    </div>

    <div className="flex items-start space-x-3 py-6">
      <input {...register('preferencesDays')} value={2} type="checkbox" className="border-gray-300 rounded h-5 w-5" />

      <div className="flex flex-col">
        <h1 className="text-gray-700 font-medium leading-none">Mercredi</h1>
        
      </div>
    </div>
    <div className="flex items-start space-x-3 py-6">
      <input {...register('preferencesDays')} value={3} type="checkbox" className="border-gray-300 rounded h-5 w-5" />

      <div className="flex flex-col">
        <h1 className="text-gray-700 font-medium leading-none">Jeudi</h1>
        
      </div>
    </div>
    <div className="flex items-start space-x-3 py-6">
      <input  {...register('preferencesDays')} value={4} type="checkbox" className="border-gray-300 rounded h-5 w-5" />

      <div className="flex flex-col">
        <h1 className="text-gray-700 font-medium leading-none">Vendredi</h1>
        
      </div>
    </div>
    <div className="flex items-start space-x-3 py-6">
      <input  {...register('preferencesDays')} value={5} type="checkbox" className="border-gray-300 rounded h-5 w-5" />

      <div className="flex flex-col">
        <h1 className="text-gray-700 font-medium leading-none">Samedi</h1>
        
      </div>
    </div>
    <div className="flex items-start space-x-3 py-6">
      <input  {...register('preferencesDays')} value={6} type="checkbox" className="border-gray-300 rounded h-5 w-5" />

      <div className="flex flex-col">
        <h1 className="text-gray-700 font-medium leading-none">Dimanche</h1>
        
      </div>
    </div>
  </div>
  </div>
  <div className="container">
    <h2>Calendriers à intégrer</h2>
  <div className="flex flex-wrap">
  <div className="flex items-start space-x-3 py-6">
    <input {...register('preferencesCalendar.shelterSeedling')} value='shelterSeedling' type="checkbox" className="border-gray-300 rounded h-5 w-5" />

    <div className="flex flex-col">
      <h1 className="text-gray-700 font-medium leading-none">Semis sous abri</h1>
      
    </div>
  </div>

  <div className="flex items-start space-x-3 py-6">
    <input {...register('preferencesCalendar.seedling')} value='seedling' type="checkbox" className="border-gray-300 rounded h-5 w-5" />

    <div className="flex flex-col">
      <h1 className="text-gray-700 font-medium leading-none">Semis extérieur</h1>
      
    </div>
  </div>

  <div className="flex items-start space-x-3 py-6">
    <input {...register('preferencesCalendar.germination')} value='germination' type="checkbox" className="border-gray-300 rounded h-5 w-5" />

    <div className="flex flex-col">
      <h1 className="text-gray-700 font-medium leading-none">Germination</h1>
      
    </div>
  </div>
  <div className="flex items-start space-x-3 py-6">
    <input {...register('preferencesCalendar.plantation')} value='plantation' type="checkbox" className="border-gray-300 rounded h-5 w-5" />

    <div className="flex flex-col">
      <h1 className="text-gray-700 font-medium leading-none">Plantation</h1>
      
    </div>
  </div>
  <div className="flex items-start space-x-3 py-6">
    <input {...register('preferencesCalendar.harvest')} value='harvest' type="checkbox" className="border-gray-300 rounded h-5 w-5" />

    <div className="flex flex-col">
      <h1 className="text-gray-700 font-medium leading-none">Récolte</h1>
      
    </div>
  </div>
  
  </div>
</div>
</div>
  )
}
