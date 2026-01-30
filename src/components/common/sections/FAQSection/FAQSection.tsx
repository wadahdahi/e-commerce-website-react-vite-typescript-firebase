import QuestionsCards from "./QuestionsCards";
import Abstract3 from "../../../../../public/assets/icons/abstract-design/Abstract Design 3(nour).png";
import FilterTabs from "../../FilterTabs/FilterTabs";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "@/redux/questions";
export default function FAQSection() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.faq.activeTab);
  const filteredFaqs = useSelector(
    (state: RootState) => state.faq.filteredFaqs
  );

  return (
    <section className="font-roboto border-2 border-dashed rounded-[16px] border-dark-15 mb-[100px] max-2xl:mb-[80px] max-md:mb-[50px] overflow-hidden">
      <div
        className={`relative flex flex-col w-full gap-[50px] rotate-0 opacity-100 max-lg:overflow-x-auto max-lg:scroll-smooth 
        border-b-2 border-dashed border-dark-15 pt-20
        pr-[300px] pb-20 pl-20
        max-2xl:gap-10
        max-2xl:pt-[60px]
        max-2xl:pr-[250px]
        max-2xl:pb-[60px] max-2xl:pl-[60px] max-lg:gap-[30px] max-lg:pt-[30px] max-lg:pr-[20px] max-lg:pb-[30px] max-lg:pl-[20px] 2xl:h-[386px] lg:h-[302px] `}
      >
        <div
          className={`font-robotom flex flex-col gap-[30px] max-2xl:gap-6 max-lg:gap-5`}
        >
          <h2 className="font-medium text-5xl leading-[100%] tracking-normal uppercase max-2xl:text-[38px] max-lg:text-[28px]">
            Have Questions? We Have Answers.
          </h2>
          <p className="text-gray-40 font-normal text-lg leading-[150%] tracking-normal max-2xl:text-base max-lg:text-sm">
            Ease into the world of StyleLoom with clarity. Our FAQs cover a
            spectrum of topics.
          </p>
        </div>
        <img
          src={Abstract3}
          alt="Abstract"
          className={`absolute right-0 top-0 max-lg:hidden 2xl:h-[370px] lg:h-[280px]`}
        />
        <FilterTabs
          tabs={["All", "Ordering", "Shipping", "Returns", "Support"]}
          activeTab={activeTab}
          onChange={(tab) => dispatch(setActiveTab(tab))}
        />
      </div>

      <QuestionsCards filteredFaqs={filteredFaqs} />
    </section>
  );
}
