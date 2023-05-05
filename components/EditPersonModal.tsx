import { IPerson } from "@/types/Household";
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
  Spacer,
} from "@chakra-ui/react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  isSelf: boolean;
  isEdit: boolean;
  person: IPerson;
  setPerson: (e: IPerson) => void;
  saveFunc: (e: IPerson) => void;
  deleteFunc: () => void;
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

export default function EditPersonModal({
  isOpen,
  onClose,
  isSelf,
  isEdit,
  person,
  setPerson,
  saveFunc,
  deleteFunc,
}: IProps) {
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
    saveFunc(person);
    onClose();
  };

  const onDelete = () => {
    deleteFunc();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEdit ? <Text>Edit Person</Text> : <Text>Add Person</Text>}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup size="sm">
            <FormLabel>Age</FormLabel>
            <Input
              value={age}
              onChange={(e) =>
                setPerson({ ...person, age: parseInt(e.target.value) })
              }
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
          {isEdit && !isSelf && (
            <Button colorScheme="red" onClick={onDelete}>
              Delete
            </Button>
          )}
          <Spacer />
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="blue" onClick={onSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
