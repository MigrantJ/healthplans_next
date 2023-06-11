import { useState, useEffect } from "react";
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";

interface IProps {
  rangeExtents: { min: number; max: number };
  displayMod: (num: number) => string;
  onChangeEnd: (range: number[]) => void;
}

export default function DualSlider({
  rangeExtents,
  displayMod,
  onChangeEnd,
}: IProps) {
  const [oldExtents, setOldExtents] = useState(rangeExtents);
  const [range, setRange] = useState([rangeExtents.min, rangeExtents.max]);
  // if rangeExtents changes, reset the slider to min and max
  useEffect(() => {
    if (
      rangeExtents.min !== oldExtents.min ||
      rangeExtents.max !== oldExtents.max
    ) {
      setOldExtents(rangeExtents);
      onChangeEnd([rangeExtents.min, rangeExtents.max]);
      setRange([rangeExtents.min, rangeExtents.max]);
    }
  }, [rangeExtents]);

  return (
    <>
      <RangeSlider
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={["min", "max"]}
        min={rangeExtents.min}
        max={rangeExtents.max}
        step={25}
        value={range}
        onChange={(range) => {
          onChangeEnd(range);
          setRange(range);
        }}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      <Flex>
        <Box>{displayMod(range[0])}</Box>
        <Spacer />
        <Box>{displayMod(range[1])}</Box>
      </Flex>
    </>
  );
}
