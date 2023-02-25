import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { AiOutlineStar } from 'react-icons/ai'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'

export const CollapsibleMenu = () => {
    const [open, setOpen] = React.useState(false);
    return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>

      <div className="cursor-pointer flex items-center px-4 py-3 font-semibold hover:bg-lime-100 rounded-md">
        <Collapsible.Trigger asChild>
        <span className='flex items-center'><AiOutlineStar className="text-4xl md:text-xl"/> <span className='ml-2 hidden xl:block'> Favoris </span>
          <button className='ml-2'>
            {open ? <RiArrowDropUpLine className='text-2xl' /> : < RiArrowDropDownLine className='text-2xl'/>}
          </button>
          </span>
         
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content className='flex flex-col items-center justify-start'>
       
          <span className="flex items-center px-2 py-1 font-semibold hover:bg-lime-100 rounded-md">tomate</span>
          <span className="flex items-center px-2 py-1 font-semibold hover:bg-lime-100 rounded-md">betterave</span>
        
      </Collapsible.Content>
    </Collapsible.Root>


    )
}