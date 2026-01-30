import PolicySection, {
  DataContact,
} from "@/components/non-common/sections/PolicySection/PolicySection";
import TestimonialsSection from "@/components/common/sections/TestimonialsSection/TestimonialsSection";
import FAQSection from "@/components/common/sections/FAQSection/FAQSection";
import CTASection from "@/components/common/sections/CTASection/CTASection";
import ContactInfoSection from "@/components/non-common/sections/ContactInfoSection/ContactInfoSection";
const data1: DataContact[] = [
  {
    image: "/assets/icons/return-policy/eligibility.svg",
    title: "Eligibility",
    paragraph:
      "Items must be unused, with tags attached, and returned within 30 days of delivery.",
  },
  {
    image: "/assets/icons/return-policy/process.svg",
    title: "Process",
    paragraph:
      "Initiate returns through our Return Center for a smooth and efficient process.",
  },
  {
    image: "/assets/icons/return-policy/refund.svg",
    title: "Refund",
    paragraph:
      "Expect a refund to your original payment method within 7-10 business days.",
  },
];

const data2: DataContact[] = [
  {
    image: "/assets/icons/cancellation-policy/cancellation-window.svg",
    title: "Cancellation Window",
    paragraph:
      "Orders can be canceled within 24 hours of placement for a full refund.",
  },
  {
    image: "/assets/icons/cancellation-policy/cancellation-process.svg",
    title: "Cancellation Process",
    paragraph:
      "Visit our Order Management section to cancel your order effortlessly.",
  },
  {
    image: "/assets/icons/cancellation-policy/refund-timeline.svg",
    title: "Refund Timeline",
    paragraph:
      "Refunds for canceled orders are processed within 5-7 business days.",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-[80px]">
      <ContactInfoSection />
      {/* RETURN POLICY SECTION */}
      <PolicySection
        header="RETURN POLICY"
        buttonDescription="Read Return Policy"
        data={data1}
      />
      {/* CANCELATION POLICY SECTION */}
      <PolicySection
        header="CANCELLATION POLICY"
        buttonDescription="Read Cancellation Policy"
        data={data2}
      />
      <TestimonialsSection />
      <FAQSection />
      <CTASection
        title="elevate your wardrobe"
        description="Don't miss out – experience the epitome of fashion by clicking 'Buy Now' and embrace a world of chic elegance delivered to your doorstep. Your style journey begins here."
      />
    </div>
  );
}
