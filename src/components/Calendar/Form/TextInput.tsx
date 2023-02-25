import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";

export const TextInput = () => {

    const [start, setStart] = useState(new Date())
    const { register, setValue } = useFormContext();
    return (
    <div className="flex justify-center">
      <div className="relative mb-3 xl:w-96">
            {/* <input
            {... register('title')}
              type="text"
              name="title"/> */}
            {/* <label htmlFor="title">Titre</label> */}
         
              <DatePicker onChange={(date: Date)=> {setStart(date); setValue('start', start.toISOString())}} selected={start}/>
              <input
              defaultValue={start.toISOString()}
              {...register('start')}
              type="hidden"
              hidden
            />
                     
      </div>
</div>
    )
}