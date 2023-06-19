import IPerson, { Relationship, relationshipOptions } from "@/types/Person";
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
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  people: IPerson[];
  setPeople: (h: IPerson[]) => void;
  personIndex: number;
}

const checkbox_options = [
  "has_mec",
  "is_parent",
  "is_pregnant",
  "uses_tobacco",
];

const isSelf = (personIndex: number, people: IPerson[]) => {
  return personIndex > 0 || (personIndex === -1 && people.length > 0);
};

export default function EditPersonModal({
  isOpen,
  onClose,
  people,
  setPeople,
  personIndex,
}: IProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const person = people[personIndex];
  const age = person?.age || "";
  const sex = person?.gender || "";
  const relationship = person?.relationship || "";
  const options = checkbox_options.filter((o) => !!person && person[o]);

  const onSubmit = (data: IPerson) => {
    data.relationship = data.relationship || "Self";
    const newPeople = people.slice();
    if (personIndex >= 0) {
      newPeople[personIndex] = data;
    } else {
      newPeople.push(data);
    }
    setPeople(newPeople);
    onClose();
  };

  const onDelete = () => {
    const newPeople = people.slice();
    newPeople.splice(personIndex, 1);
    setPeople(newPeople);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {personIndex > -1 ? (
            <Text>Edit Person</Text>
          ) : (
            <Text>Add Person</Text>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl
              id="Age"
              isRequired
              isInvalid={person?.age < 1 || person?.age > 125}
            >
              <InputGroup size="sm">
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  inputMode="numeric"
                  defaultValue={age}
                  {...register("age", { required: true, min: 1, max: 125 })}
                  marginLeft="5px"
                />
              </InputGroup>
              <FormErrorMessage>Age is required.</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <InputGroup size="sm">
                <FormLabel htmlFor="Sex">Sex</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      defaultValue={sex}
                      paddingLeft="10px"
                    >
                      <Radio value="Male">Male</Radio>
                      <Radio value="Female">Female</Radio>
                    </RadioGroup>
                  )}
                  rules={{
                    required: { value: true, message: "This is required." },
                  }}
                />
              </InputGroup>
            </FormControl>
            {isSelf(personIndex, people) && (
              <FormControl isRequired>
                <InputGroup size="sm">
                  <FormLabel>Relationship</FormLabel>
                  <Select
                    placeholder="Select option"
                    defaultValue={relationship}
                    {...register("relationship")}
                  >
                    {relationshipOptions.map((r: Relationship, i) => {
                      // we don't want Self appearing in the dropdown, it will be the assumed default
                      if (r === "Self") return;
                      return (
                        <option key={i} value={r}>
                          {r}
                        </option>
                      );
                    })}
                  </Select>
                </InputGroup>
              </FormControl>
            )}
            <Text>Select any that apply:</Text>
            <FormControl>
              <Controller
                name="options"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <CheckboxGroup {...rest}>
                    <Stack direction="column">
                      <Checkbox value="is_parent">
                        Legal parent or guardian of a child under 19
                      </Checkbox>
                      <Checkbox value="is_pregnant">Pregnant</Checkbox>
                      <Checkbox value="uses_tobacco">Tobacco User</Checkbox>
                      <Checkbox value="has_mec">
                        Eligible for health coverage through a job, Medicare,
                        Medicaid, or CHIP
                      </Checkbox>
                    </Stack>
                  </CheckboxGroup>
                )}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {personIndex > 0 && (
              <Button colorScheme="red" onClick={onDelete}>
                Delete
              </Button>
            )}
            <Spacer />
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" type="submit">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
