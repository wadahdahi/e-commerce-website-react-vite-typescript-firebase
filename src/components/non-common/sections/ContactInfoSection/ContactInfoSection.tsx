import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import ContactInfoCard from "./ContactInfoCard";
import SectionHeader from "./../../../common/UI/SectionHeader";

export default function ContactInfoSection() {
  const contactCards = useSelector(
    (state: RootState) => state.contactCardsSlice.cards,
  );

  return (
    <section className="relative border-2 border-dashed border-dark-15 rounded-[14px] lg:rounded-2xl 2xl:rounded-[20px]">
      {/* SectionHeader */}
      <SectionHeader
        title="Your Partner in Every Step of Your Fashion Journey."
        subtitle="24/7 Assistance for Seamless Shopping and Unmatched Customer Satisfaction."
        imageSrc="/assets/icons/abstract-design/abstract-design-5.svg"
      />

      <div className="relative p-[30px] lg:p-10 2xl:p-[50px] border-b-2 border-dashed border-dark-15">
        <h3 className="font-roboto font-medium uppercase text-xl lg:text-2xl 2xl:text-3xl">
          Contact Information
        </h3>
      </div>

      <div className="relative grid lg:grid-cols-3">
        {contactCards.map((card) => (
          <div
            key={card.id}
            className="
              border-b-2 border-dashed border-dark-15
              last:border-b-0
              lg:border-r-2
              lg:[&:nth-child(3n)]:border-r-0
              lg:[&:nth-last-child(-n+3)]:border-b-0
            "
          >
            <ContactInfoCard
              iconBg={card.iconBg}
              iconMain={card.iconMain}
              title={card.title}
              content={card.content}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
