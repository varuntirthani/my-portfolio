import type { Metadata } from "next";
import { CFAHub } from "@/components/cfa/CFAHub";

export const metadata: Metadata = {
  title: "CFA Knowledge Hub",
  description:
    "Interactive, searchable CFA exam notes across Levels I, II, and III.",
};

export default function CFAPage() {
  return <CFAHub />;
}
