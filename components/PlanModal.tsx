import NextLink from "next/link";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Link,
  Heading,
  Icon,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Flex,
} from "@chakra-ui/react";
import {
  RiExternalLinkLine,
  RiMedicineBottleLine,
  RiStethoscopeLine,
} from "react-icons/ri";

import IHealthPlan from "@/types/HealthPlan";

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
          {modalPlan.issuer.shop_url ? (
            <Link as={NextLink} href={modalPlan.issuer.shop_url} isExternal>
              <Text size="lg" as="b" display="inline-block">
                {modalPlan.issuer.name}
              </Text>
              <Icon as={RiExternalLinkLine} boxSize={5} />
            </Link>
          ) : (
            <Text size="lg" as="b" display="inline-block">
              {modalPlan.issuer.name}
            </Text>
          )}

          <Heading size="md">{modalPlan.name}</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>Premium</Th>
                <Th>Deductible</Th>
                <Th>Max Out-Of-Pocket</Th>
              </Tr>
            </Thead>
            <Tr>
              <Td>{modalPlan.premium}</Td>
              <Td>{modalPlan.deductibles[0].amount}</Td>
              <Td>{modalPlan.moops[0].amount}</Td>
            </Tr>
          </Table>
          <Heading size="md">Copays / Coinsurance</Heading>
          {modalPlan.benefits.map((b) => {
            return (
              <>
                <Heading size="sm">{b.name}</Heading>
                <Text>{b.cost_sharings[0].display_string}</Text>
              </>
            );
          })}
          <Link as={NextLink} href={modalPlan.network_url} isExternal>
            <Flex alignItems="center">
              <span>
                <Icon as={RiStethoscopeLine} boxSize={7} />
              </span>
              <Text display="inline-block">Find in-network doctors</Text>
            </Flex>
          </Link>
          <Link as={NextLink} href={modalPlan.formulary_url} isExternal>
            <Flex alignItems="center">
              <span>
                <Icon
                  as={RiMedicineBottleLine}
                  boxSize={7}
                  display="inline-block"
                />
              </span>
              <Text display="inline-block">Find covered medications</Text>
            </Flex>
          </Link>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
