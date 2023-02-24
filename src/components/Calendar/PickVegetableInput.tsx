import { forwardRef, useState } from 'react';
import { Group, Avatar, Text, MantineColor, SelectItemProps, Autocomplete } from '@mantine/core';
import { Vegetable } from '@prisma/client';
import { useAddEventFormContext } from './hooks/addEventForm-context';

export const PickVegetableInput = ({dataInput}: any) => {
  const form = useAddEventFormContext();
  const [value, setValue] = useState('');
  console.log(value);

const data = dataInput && dataInput.map((item: any) => ({ id: item.id, value: item.name }));

interface ItemProps extends SelectItemProps {
    color: MantineColor;
    description: string;
    image: string;
  }

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ description, value, image, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />
  
          <div>
            <Text>{value}</Text>
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          </div>
        </Group>
      </div>
    )
  );



  return (
    
    <Autocomplete
    {...form.getInputProps('relatedVegetable.value')}
    // onChange={(vegetable)=> setRelatedVegetable(dataInput.find((v: { name: string; }) => v.name === vegetable ).id)}
    label="Choisir une plante potagère à associer"
    placeholder="tomate .."
    itemComponent={AutoCompleteItem}
    data={data}
    // value={value}
    // onChange={setValue}
    filter={(value, item) =>          
      item.value.toLowerCase().includes(value.toLowerCase().trim())
         
      // item.value.toLowerCase().includes(value.toLowerCase().trim())
      // item.value.toLowerCase().includes(value.toLowerCase().trim()) 
    }
    />
  );
}
