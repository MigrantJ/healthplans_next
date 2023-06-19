import { useState, memo } from "react";
import { Box, Icon, Tooltip } from "@chakra-ui/react";
import { RiInformationLine, RiInformationFill } from "react-icons/ri";

interface IProps {
  text: string;
}

export default memo(function InfoIcon({ text }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTooltip = () => setIsOpen(!isOpen);

  return (
    <Tooltip label={text} isOpen={isOpen}>
      <Box
        as="span"
        onClick={toggleTooltip}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* conditional rendering is too slow and results in the tooltip getting stuck open, this method works */}
        <Icon
          as={RiInformationFill}
          display={isOpen ? "inline-block" : "none"}
        />
        <Icon
          as={RiInformationLine}
          display={!isOpen ? "inline-block" : "none"}
        />
      </Box>
    </Tooltip>
  );
});
