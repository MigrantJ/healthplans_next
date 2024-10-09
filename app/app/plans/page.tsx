"use client";
import MainWindow from "@/components/MainWindow";
import { useLocation } from "@/lib/householdStore";
import { redirect } from "next/navigation";

export default function IndexPage() {
  const location = useLocation();
  if (!location.data?.zipcode) {
    redirect("/app");
  }
  return <MainWindow />;
}
