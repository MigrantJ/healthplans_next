import { useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Text,
  useDisclosure,
  PlacementWithLogical,
} from "@chakra-ui/react";

interface IProps {
  variant?: string;
  placement: PlacementWithLogical;
  offset: [number, number];
  children: JSX.Element;
}

export default function HelpPopover({
  placement,
  offset,
  children,
  variant = "base",
}: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const closedHouseholdNote = JSON.parse(
      localStorage.getItem("closedHouseholdNote")
    ) as boolean;
    if (!closedHouseholdNote) {
      setTimeout(onOpen, 4000);
    }
  }, []);

  return (
    <Popover
      variant={variant}
      placement={placement}
      offset={offset}
      closeOnBlur={false}
      arrowSize={12}
      isOpen={isOpen}
      onClose={() => {
        localStorage.setItem("closedHouseholdNote", "true");
        onClose();
      }}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Text>
              For more accurate premium estimates, you can enter your household
              members and expected income for the year you want coverage.
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
