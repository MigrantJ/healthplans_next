import { useState } from "react";
import { Icon, Tooltip } from "@chakra-ui/react";
import { RiInformationLine, RiInformationFill } from "react-icons/ri";

interface IProps {
  text: string;
}

export default function InfoIcon({ text }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTooltip = () => setIsOpen(!isOpen);

  return (
    <Tooltip label={text} isOpen={isOpen}>
      <span>
        <Icon
          as={isOpen ? RiInformationFill : RiInformationLine}
          onClick={toggleTooltip}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        />
      </span>
    </Tooltip>
  );
}
