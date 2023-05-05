import { useState } from "react";
import { Button, FormLabel, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import EditPersonModal from "@/components/EditPersonModal";
import IHousehold, { IPerson } from "@/types/Household";

interface IProps {
  household: IHousehold;
  setHousehold: (h: IHousehold) => void;
}

export default function HouseholdWidget({ household, setHousehold }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [personIndex, setPersonIndex] = useState(-1);

  const openModal = (person_index: number = -1) => {
    setPersonIndex(person_index);
    onOpen();
  };

  return (
    <>
      <EditPersonModal
        {...{
          isOpen,
          onClose,
          household,
          setHousehold,
          personIndex,
        }}
      ></EditPersonModal>
      <FormLabel>People</FormLabel>
      {household?.people.map((p, i) => (
        <Button key={i} onClick={(_) => openModal(i)}>
          {p.relationship} - {p.age}
          {p.gender[0]}
        </Button>
      ))}
      <Button
        onClick={() => {
          openModal();
        }}
      >
        {household?.people.length ? (
          <Text>+ Add Person</Text>
        ) : (
          <Text>+ Add Yourself</Text>
        )}
      </Button>
    </>
  );
}