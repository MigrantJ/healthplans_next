import { useState } from "react";
import {
  FormLabel,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";

interface IProps {
  label: string;
  initRange: { min: number; max: number };
  rangeExtents: { min: number; max: number };
  onChangeEnd: (range: number[]) => void;
}

export default function DualSlider({
  label,
  initRange,
  rangeExtents,
  onChangeEnd,
}: IProps) {
  const [range, setRange] = useState([initRange.min, initRange.max]);
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <RangeSlider
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={["min", "max"]}
        min={rangeExtents.min}
        max={rangeExtents.max}
        step={25}
        value={range}
        onChange={(range) => setRange(range)}
        onChangeEnd={onChangeEnd}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      <Flex>
        <Box>{range[0]}</Box>
        <Spacer />
        <Box>{range[1]}</Box>
      </Flex>
    </>
  );
}
