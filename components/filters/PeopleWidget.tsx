import { useState, memo } from "react";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import EditPersonModal from "./EditPersonModal";
import IPerson from "@/types/Person";

interface IProps {
  people: IPerson[];
  setPeople: (h: IPerson[]) => void;
}

export default memo(function PeopleWidget({ people, setPeople }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [personIndex, setPersonIndex] = useState(-1);

  const openModal = (person_index = -1) => {
    setPersonIndex(person_index);
    onOpen();
  };

  return (
    <>
      {isOpen && (
        <EditPersonModal
          {...{
            isOpen,
            onClose,
            people,
            setPeople,
            personIndex,
          }}
        />
      )}

      <VStack>
        {people.map((p, i) => (
          <Button key={i} onClick={(_) => openModal(i)}>
            {p.relationship} - {p.age}
            {p.gender[0]}
          </Button>
        ))}
      </VStack>
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
});
