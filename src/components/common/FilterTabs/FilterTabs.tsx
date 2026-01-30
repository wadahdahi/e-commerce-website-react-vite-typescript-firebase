import { FilterTabsProps } from "@/type";

export default function FilterTabs<T extends string>({
  tabs,
  onChange,
  activeTab,
  type,
}: FilterTabsProps<T>) {
  return (
    <div
      className={`flex items-center gap-[10px] 2xl:gap-[14px]   
    ${
      type === "Hero"
        ? "flex-wrap "
        : "overflow-x-auto sm:overflow-x-visible scroll-smooth w-full"
    }`}
    >
      {tabs.map((tab) => {
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={` 2xl:px-[24px] rounded-[12px] font-normal text-sm 2xl:text-lg leading-[150%] font-mono cursor-pointer
     ${
       type === "Hero"
         ? "px-[12px] py-[12px] 2xl:py-[14px]"
         : "px-[20px] py-[14px] 2xl:py-[18px]"
     }
      ${
        activeTab === tab
          ? "px-[24px] 2xl:px-[30px] text-dark-primary-bg bg-brown-70"
          : " border border-dashed border-dark-20 text-gray-70"
      }`}
          >
            {tab}{" "}
          </button>
        );
      })}
    </div>
  );
}
