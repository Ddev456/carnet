import { forwardRef } from 'react';
import { Group, Avatar, Text, MantineColor, SelectItemProps, Autocomplete } from '@mantine/core';

export const PickVegetableInput = ({dataInput}: any) => {

const data = dataInput && dataInput.map((item: any) => ({ value: item.name }));

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
      label="Choose employee of the month"
      placeholder="Pick one"
      itemComponent={AutoCompleteItem}
      data={data}
      filter={(value, item) =>
        item.value.toLowerCase().includes(value.toLowerCase().trim()) 
        // ||item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
}
