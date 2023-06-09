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
import { Estimate } from "@/types/GetCreditEstimate";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  modalPlan: IHealthPlan;
  creditEstimates: Estimate[];
}

export default function PlanModal({
  isOpen,
  onClose,
  modalPlan,
  creditEstimates,
}: IProps) {
  if (!modalPlan) return;

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <ComparePlans
            plans={[modalPlan]}
            savePlan={null}
            {...{ creditEstimates }}
          />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
