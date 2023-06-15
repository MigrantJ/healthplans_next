import { useState, memo } from "react";
import { Button, Divider, Text, VStack, Flex } from "@chakra-ui/react";
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

      <Flex flexWrap="wrap" gap="5px">
        {people.map((p, i) => (
          <Button
            variant="sidebar"
            size="sm"
            key={i}
            onClick={(_) => openModal(i)}
          >
            {p.relationship} - {p.age}
            {p.gender[0]}
          </Button>
        ))}
      </Flex>
      <Divider marginY="10px" />
      <Button
        variant="sidebar"
        size="sm"
        width="100%"
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
