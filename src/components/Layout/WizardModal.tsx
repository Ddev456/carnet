import Modal from "../Shared/Modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { LoadingDots } from "../Shared/Icons/Icons";
import Image from "next/image";
import { Wizard } from "../Calendar/Wizard";
import { DateClickArg, EventClickArg, EventInput } from "fullcalendar";
import { EventImpl } from "@fullcalendar/core/internal";

const WizardModal = ({
  showWizardModal,
  setShowWizardModal,
  wizardType,
  children,
}: {
  showWizardModal: boolean;
  setShowWizardModal: Dispatch<SetStateAction<boolean>>;
  wizardType: string;
  children: ReactNode;
}) => {
  const [wizardClicked, setWizardClicked] = useState(false);

  return (
    <Modal showModal={showWizardModal} setShowModal={setShowWizardModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h3 className="font-display text-2xl font-bold">{wizardType}</h3>
          <p className="text-sm text-gray-500">
            Bienvenue sur l\'assistant potager !
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export function useWizardModal() {
  const [showWizardModal, setShowWizardModal] = useState(false);
  const [wizardType, setWizardType] = useState<string>('');
  const [onClickInfos, setOnClickInfos] = useState<EventInput | undefined>();
  const WizardModalCallback = useCallback(() => {
    return (
      <WizardModal
        wizardType={wizardType}
        showWizardModal={showWizardModal}
        setShowWizardModal={setShowWizardModal}
      ><Wizard setShowWizardModal={setShowWizardModal} wizardType={wizardType} onClickInfos={onClickInfos}/></WizardModal>
    );
  }, [showWizardModal, setShowWizardModal, wizardType, setWizardType]);

  return useMemo(
    () => ({ setShowWizardModal, setWizardType, setOnClickInfos, WizardModal: WizardModalCallback }),
    [setShowWizardModal, setWizardType, setOnClickInfos, WizardModalCallback],
  );
}
