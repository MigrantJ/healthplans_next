import { useState } from "react";
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

const checkbox_options = [
  "has_mec",
  "is_parent",
  "is_pregnant",
  "uses_tobacco",
];

interface FormData {
  age: string;
  gender: "Male" | "Female";
  relationship: Relationship;
}

const isSelf = (personIndex: number, people: IPerson[]) => {
  return personIndex > 0 || (personIndex === -1 && people.length > 0);
};

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  people: IPerson[];
  setPeople: (h: IPerson[]) => void;
  personIndex: number;
}

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
    formState: { errors },
  } = useForm();
  const [options, setOptions] = useState(
    checkbox_options.filter(
      (o) => !!people[personIndex] && people[personIndex][o]
    )
  );

  const person = people[personIndex];
  const age = person?.age || "";
  const sex = person?.gender || "";
  const relationship = person?.relationship || "";

  const onSubmit = (data: FormData) => {
    const newPerson: IPerson = {
      age: parseInt(data.age),
      gender: data.gender,
      relationship: data.relationship || "Self",
      has_mec: options.includes("has_mec"),
      is_parent: options.includes("is_parent"),
      is_pregnant: options.includes("is_pregnant"),
      uses_tobacco: options.includes("uses_tobacco"),
    };
    const newPeople = people.slice();
    if (personIndex >= 0) {
      newPeople[personIndex] = newPerson;
    } else {
      newPeople.push(newPerson);
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
            <FormControl id="Age" isInvalid={!!errors.age} lineHeight="30px">
              <InputGroup size="sm">
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  inputMode="numeric"
                  defaultValue={age}
                  {...register("age", {
                    required: "This field is required.",
                    min: { value: 1, message: "Must be between 1 and 125." },
                    max: { value: 125, message: "Must be between 1 and 125." },
                    pattern: {
                      value: /^[0-9]{1,3}$/,
                      message: "Please round to the nearest year.",
                    },
                  })}
                  width="100px"
                  marginLeft="10px"
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.age?.message.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.gender} paddingTop="10px">
              <InputGroup size="sm">
                <FormLabel htmlFor="Sex">Sex</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue={sex}
                  render={({ field }) => (
                    <RadioGroup {...field} paddingLeft="10px">
                      <Radio value="Male">Male</Radio>
                      <Radio value="Female" marginLeft="10px">
                        Female
                      </Radio>
                    </RadioGroup>
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required.",
                    },
                  }}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.gender?.message.toString()}
              </FormErrorMessage>
            </FormControl>
            {isSelf(personIndex, people) && (
              <FormControl isInvalid={!!errors.relationship}>
                <InputGroup size="sm">
                  <FormLabel>Relationship</FormLabel>
                  <Select
                    placeholder="Select option"
                    defaultValue={relationship}
                    {...register("relationship", {
                      required: "This field is required.",
                    })}
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
                <FormErrorMessage>
                  {errors.relationship?.message.toString()}
                </FormErrorMessage>
              </FormControl>
            )}
            <Text paddingTop="10px">Select any that apply:</Text>
            <FormControl>
              <Controller
                name="options"
                control={control}
                render={() => (
                  <CheckboxGroup
                    value={options}
                    onChange={(e) => setOptions(e as string[])}
                  >
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
            <Button marginLeft="10px" colorScheme="blue" type="submit">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
