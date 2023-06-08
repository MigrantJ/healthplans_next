import NextLink from "next/link";
import {
  Button,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Link,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: IProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>About This App</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            HealthPlansNext uses the{" "}
            <Link
              as={NextLink}
              href="https://marketplaceapicms.docs.apiary.io/#introduction/about"
              isExternal
            >
              Marketplace API
            </Link>{" "}
            provided by{" "}
            <Link as={NextLink} href="https://www.healthcare.gov/" isExternal>
              HealthCare.gov.
            </Link>
          </Text>
          <br />
          <Text>It was created using the following tools:</Text>
          <UnorderedList>
            <ListItem>Front-End: React (TypeScript)</ListItem>
            <ListItem>Routing / API: Next.js</ListItem>
            <ListItem>Deployment Platform: Vercel</ListItem>
            <ListItem>UI Components: Chakra UI</ListItem>
            <ListItem>Data Fetch / Caching: Tanstack Query</ListItem>
            <ListItem>Data Visualization: D3.js</ListItem>
            <ListItem>Icons: Remix Icon via React Icons</ListItem>
          </UnorderedList>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
