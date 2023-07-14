"use client";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export default function IndexPage() {
  return (
    <Link as={NextLink} href="/plans">
      Hey try this
    </Link>
  );
}
