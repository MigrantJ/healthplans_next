import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  InputGroup,
  FormLabel,
  Text,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Stack,
  Select,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import IHousehold, { IPerson } from "@/types/Household";

interface IProps {
  household: IHousehold;
  setHousehold: (h: IHousehold) => void;
}

const relationship_options = [
  "Brother",
  "Sister",
  "Child",
  "Collateral Dependent",
  "Ex-Spouse",
  "Foster Child",
  "Grandson",
  "Granddaughter",
  "Life Partner",
  "Nephew",
  "Niece",
  "Other Relationship",
  "Other Relative",
  "Sponsored Dependent",
  "Spouse",
  "Stepson",
  "Stepdaughter",
  "Ward",
];
const checkbox_options = [
  "has_mec",
  "is_parent",
  "is_pregnant",
  "uses_tobacco",
];
let savePersonFunc: (p: IPerson) => void;

function EditPersonModal({ isOpen, onClose, isSelf, person, setPerson }) {
  const age = person?.age || "";
  const sex = person?.gender || "";
  const relationship = person?.relationship || "";
  const options = checkbox_options.filter((o) => !!person && person[o]);

  const setOptions = (oldOptions) => {
    let newOptions = {};
    for (let option of checkbox_options) {
      newOptions[option] = oldOptions.includes(option);
    }
    setPerson({ ...person, ...newOptions });
  };

  const onSave = () => {
    savePersonFunc(person);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {person ? <Text>Edit Person</Text> : <Text>Add Person</Text>}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup size="sm">
            <FormLabel>Age</FormLabel>
            <Input
              value={age}
              onChange={(e) => setPerson({ ...person, age: e.target.value })}
            />
          </InputGroup>
          <InputGroup size="sm">
            <FormLabel>Sex</FormLabel>
            <RadioGroup
              onChange={(e) => setPerson({ ...person, gender: e })}
              value={sex}
            >
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </RadioGroup>
          </InputGroup>
          {!isSelf && (
            <InputGroup size="sm">
              <FormLabel>Relationship</FormLabel>
              <Select
                placeholder="Select option"
                value={relationship}
                onChange={(e) =>
                  setPerson({ ...person, relationship: e.target.value })
                }
              >
                {relationship_options.map((r, i) => {
                  return (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  );
                })}
              </Select>
            </InputGroup>
          )}
          <Text>Select any that apply:</Text>
          <CheckboxGroup
            defaultValue={[]}
            value={options}
            onChange={(e) => setOptions(e)}
          >
            <Stack direction="column">
              <Checkbox value="is_parent">
                Legal parent or guardian of a child under 19
              </Checkbox>
              <Checkbox value="is_pregnant">Pregnant</Checkbox>
              <Checkbox value="uses_tobacco">Tobacco User</Checkbox>
              <Checkbox value="has_mec">
                Eligible for health coverage through a job, Medicare, Medicaid,
                or CHIP
              </Checkbox>
            </Stack>
          </CheckboxGroup>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function HouseholdWidget({ household, setHousehold }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [person, setPerson] = useState<IPerson>();
  const [isSelf, setIsSelf] = useState(true);

  const openModal = (is_self: boolean, personIndex: number = -1) => {
    setIsSelf(is_self);
    if (personIndex >= 0) {
      setPerson(household?.people[personIndex]);
    } else {
      setPerson(null);
    }
    savePersonFunc = (p: IPerson) => {
      p.relationship = p.relationship || "Self";
      if (personIndex >= 0) {
        household.people[personIndex] = p;
      } else {
        household.people.push(p);
      }
      setHousehold(household);
    };
    onOpen();
  };

  return (
    <>
      <EditPersonModal
        {...{ isOpen, onClose, isSelf, person, setPerson }}
      ></EditPersonModal>
      <FormLabel>People</FormLabel>
      {household?.people.map((p, i) => (
        <Button
          key={i}
          onClick={(_) => openModal(p.relationship === "Self", i)}
        >
          {p.relationship}
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
    </>
  );
}
