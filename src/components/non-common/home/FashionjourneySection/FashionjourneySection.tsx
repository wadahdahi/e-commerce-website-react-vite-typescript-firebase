import SectionHeader from "@/components/common/UI/SectionHeader";

export interface Details {
  num: number;
  title: string;
  description: string;
}

export default function Fashionjourney() {
  const details: Details[] = [
    {
      num: 1,
      title: "Discover Trends",
      description:
        "Explore our curated collection of over 1000 styles, spanning global fashion trends.",
    },
    {
      num: 2,
      title: "Effortless Navigation",
      description:
        "Intuitive filters and categories help you find the perfect pieces tailored to your style.",
    },
    {
      num: 3,
      title: "Secure Checkout",
      description:
        "Multiple payment options and encrypted transactions ensure a safe and hassle-free purchase.",
    },
    {
      num: 4,
      title: "Unbox Happiness",
      description:
        "Unbox a fashion-forward experience delivered right to your door, ready to elevate your style.",
    },
  ];

  return (
    <div className="relative mx-auto max-w-[1596px] w-full rounded-xl border-2 border-dashed border-dark-15 font-(--font-roboto) mt-8 mb-30 sm:mb-20 ">
      <div
        className="relative overflow-hidden w-full h-[221px] sm:h-[213px] lg:h-[273px] flex items-start justify-start
                      border-b-2 border-dashed border-dark-15"
      >
        <SectionHeader
          title="Navigating the StyleLoom Fashion Journey."
          subtitle="At StyleLoom, we've designed a straightforward shopping experience to make fashion accessible."
          imageSrc="/assets/icons/abstract-design/abstract-design-3.svg"
          position="-top-13 -right-25"
          dimentions="w-32 sm:w-50 lg:w-80 h-auto"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-0 mt-0 relative">
        {details.map((detail, index) => {
          const isFirst = index === 0;
          return (
            <div
              key={index}
              className={` p-[30px] sm:p-1 lg:p-[50px] 2xl:p-[50px]  w-full h-[186px] sm:h-[280px] lg:h-[299px] ${!isFirst ? "border-t-2 border-dashed border-dark-15 sm:border-t-0" : ""}  ${!isFirst ? "sm:border-l-2 sm:border-dashed sm:border-dark-15" : ""}`}
            >
              <p className="font-normal font-robotmono   text-[16px] sm:text-lg 2xl:text-xl text-gray-40 mb-5 sm:mb-6 2xl:mb-[30px]">
                Step 0{detail.num}
              </p>
              <h3
                className={`font-roboto font-medium dark:text-primary-bg text-dark-primary-bg mb-2.5 sm:mb-3 2xl:mb-[16px] leading-[150%] text-xl sm:text-[22px] 2xl:text-[28px]`}
              >
                {detail.title}
              </h3>
              <p className="font-roboto font-normal text-sm sm:text-[16px] 2xl:text-lg text-gray-50 leading-[150%]">
                {detail.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
