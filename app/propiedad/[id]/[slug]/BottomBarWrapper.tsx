"use client";

import BottomBar from "@/components/layout/BottomBar";

interface Props {
  propertyRef: string;
  propertyAddress: string;
  whatsappMsg?: string;
}

export default function BottomBarWrapper({ propertyRef, propertyAddress, whatsappMsg }: Props) {
  function scrollToForm() {
    const el = document.getElementById("consultar");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <BottomBar
      propertyRef={propertyRef}
      propertyAddress={propertyAddress}
      whatsappMsg={whatsappMsg}
      onConsult={scrollToForm}
    />
  );
}
