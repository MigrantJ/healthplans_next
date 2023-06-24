import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import IHealthPlan from "@/types/HealthPlan";
import ComparePlans from "../compare_plans/ComparePlans";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  modalPlan: IHealthPlan;
}

export default function PlanModal({ isOpen, onClose, modalPlan }: IProps) {
  if (!modalPlan) return;

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <ComparePlans plans={[modalPlan]} savePlan={null} />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
