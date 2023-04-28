"use client";
import { Link } from "@chakra-ui/next-js";

export default function IndexPage() {
  return (
    <div>
      <Link href={`/getloc`} color="blue.400" _hover={{ color: "blue.500" }}>
        test get loc
      </Link>
    </div>
  );
}
