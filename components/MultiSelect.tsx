import { useState } from "react";
import { FormLabel } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

interface IProps<T> {
  label: string;
  options: T[];
  onChangeEnd: (options: T[]) => void;
}

export default function MultiSelect<T>({
  label,
  options,
  onChangeEnd,
}: IProps<T>) {
  const [selected, setSelected] = useState<{ value: T; label: T }[]>([]);
  const optionObjs = options.map((s) => {
    return {
      value: s,
      label: s,
    };
  });
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <Select
        isMulti
        options={optionObjs}
        placeholder={"Select"}
        selectedOptionStyle="check"
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        value={selected}
        onChange={(v) => {
          setSelected([...v]);
        }}
        onBlur={() => {
          onChangeEnd(selected.map((o) => o.value));
        }}
        onMenuClose={() => {
          onChangeEnd(selected.map((o) => o.value));
        }}
      />
    </>
  );
}
