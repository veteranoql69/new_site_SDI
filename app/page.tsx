import { Capabilities } from "@/components/home/Capabilities";
import { ContactSection } from "@/components/home/ContactSection";
import { HowWeWork } from "@/components/home/HowWeWork";
import { LeadsPillar } from "@/components/home/LeadsPillar";
import { ProcessSheet } from "@/components/home/ProcessSheet";

export default function Home() {
  return (
    <>
      <ProcessSheet />
      <LeadsPillar />
      <HowWeWork />
      <Capabilities />
      <ContactSection section="Portada" />
    </>
  );
}
