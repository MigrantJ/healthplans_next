import { useState } from "react";
import { Select } from "chakra-react-select";

interface IProps<T> {
  options: [T, number][];
  onChangeEnd: (options: T[]) => void;
  dropUp?: boolean;
}

export default function MultiSelect<T extends string>({
  options,
  onChangeEnd,
  dropUp=false,
}: IProps<T>) {
  const [selected, setSelected] = useState<{ value: T; label: string }[]>([]);
  const optionObjs = options.map((s) => {
    return {
      value: s[0],
      label: `${s[0]} (${s[1]})`,
    };
  });
  return (
    <>
      <Select
        variant="sidebar"
        isMulti
        useBasicStyles
        options={optionObjs}
        placeholder={"Select"}
        selectedOptionStyle="check"
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        value={selected}
        menuPlacement={dropUp ? "top" : "bottom"}
        onChange={(v) => {
          onChangeEnd(v.map((e) => e.value));
          setSelected([...v]);
        }}
      />
    </>
  );
}
