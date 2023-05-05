import { useState } from "react";
import { Button, FormLabel, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import EditPersonModal from "@/components/EditPersonModal";
import IHousehold, { IPerson } from "@/types/Household";

interface IProps {
  household: IHousehold;
  setHousehold: (h: IHousehold) => void;
}

let saveFunc: (p: IPerson) => void;
let deleteFunc: () => void;

export default function HouseholdWidget({ household, setHousehold }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [person, setPerson] = useState<IPerson>();
  const [isSelf, setIsSelf] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const openModal = (is_self: boolean, personIndex: number = -1) => {
    setIsSelf(is_self);
    if (personIndex >= 0) {
      setIsEdit(true);
      setPerson(household?.people[personIndex]);
    } else {
      setIsEdit(false);
      setPerson(null);
    }
    saveFunc = (p: IPerson) => {
      p.relationship = p.relationship || "Self";
      if (personIndex >= 0) {
        household.people[personIndex] = p;
      } else {
        household.people.push(p);
      }
      setHousehold(household);
    };
    deleteFunc = () => {
      household.people.splice(personIndex, 1);
      setHousehold(household);
    };
    onOpen();
  };

  return (
    <>
      <EditPersonModal
        {...{
          isOpen,
          onClose,
          isSelf,
          isEdit,
          person,
          setPerson,
          saveFunc,
          deleteFunc,
        }}
      ></EditPersonModal>
      <FormLabel>People</FormLabel>
      {household?.people.map((p, i) => (
        <Button
          key={i}
          onClick={(_) => openModal(p.relationship === "Self", i)}
        >
          {p.relationship} - {p.age}
          {p.gender[0]}
        </Button>
      ))}
      {household?.people.length ? (
        <Button
          onClick={() => {
            openModal(false);
          }}
        >
          <Text>+ Add Person</Text>
        </Button>
      ) : (
        <Button
          onClick={() => {
            openModal(true);
          }}
        >
          <Text>+ Add Yourself</Text>
        </Button>
      )}
      <Button
        onClick={() => {
          setHousehold({
            has_married_couple: true,
            people: [
              {
                age: 43,
                gender: "Male",
                relationship: "Self",
                has_mec: false,
                is_parent: false,
                is_pregnant: false,
                uses_tobacco: false,
              },
            ],
          });
        }}
      >
        <Text>TestHousehold</Text>
      </Button>
    </>
  );
}
