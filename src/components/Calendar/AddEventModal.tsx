import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';

export const AddEventModal = ({opened}: boolean) => {
 
    const handleClose = () => {
        
    }

  return (
      <Modal
        opened={opened}
        onClose={() => handleClose(false)}
        title="Introduce yourself!"
      >
        {/* Modal content */}
      </Modal>
  );
}