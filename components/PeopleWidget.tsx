import { useState } from "react";
import { Button, FormLabel, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import EditPersonModal from "@/components/EditPersonModal";
import IPerson from "@/types/Person";

interface IProps {
  people: IPerson[];
  setPeople: (h: IPerson[]) => void;
}

export default function PeopleWidget({ people, setPeople }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [personIndex, setPersonIndex] = useState(-1);

  const openModal = (person_index = -1) => {
    setPersonIndex(person_index);
    onOpen();
  };

  return (
    <>
      <EditPersonModal
        {...{
          isOpen,
          onClose,
          people,
          setPeople,
          personIndex,
        }}
      ></EditPersonModal>
      <FormLabel>People</FormLabel>
      {people.map((p, i) => (
        <Button key={i} onClick={(_) => openModal(i)}>
          {p.relationship} - {p.age}
          {p.gender[0]}
        </Button>
      ))}
      <Button
        onClick={() => {
          openModal(-1);
        }}
      >
        {people.length ? (
          <Text>+ Add Person</Text>
        ) : (
          <Text>+ Add Yourself</Text>
        )}
      </Button>
    </>
  );
}
