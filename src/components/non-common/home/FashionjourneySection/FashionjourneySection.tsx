import { Reveal } from "../../../common/Motion/Reveal";

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
    <div className="relative mx-auto max-w-[1596px] w-full rounded-xl outline-2 outline-dashed outline-dark.15 font-roboto mt-8 mb-30 sm:mb-20 ">
      <div className="relative overflow-hidden border-y-2 border-dashed border-dark-15">
        <div className="flex flex-col justify-start h-full p-4 sm:p-10 lg:p-12">
          <h1 className="font-medium text-2xl sm:text-4xl lg:text-5xl mb-2 sm:mb-4 lg:mb-6">
            Navigating the StyleLoom Fashion Journey.
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-normal text-gray-40">
            At StyleLoom, we've designed a straightforward shopping experience
            to make fashion accessible.
          </p>
        </div>

        <Reveal
          className="absolute -top-13 -right-25 hidden sm:block lg:block"
          variant="fade-right"
          distance={220}
          rotateInitial={135}
          duration={1.2}
          ease="backOut"
        >
          <img
            src="/assets/icons/abstract-design/abstract-design-3.svg"
            alt="abstract"
            className="w-32 sm:w-50 lg:w-80 h-auto"
          />
        </Reveal>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-0 mt-0 relative">
        {details.map((detail, index) => {
          const isFirst = index === 0;
          return (
            <div
              key={index}
              className={` flex flex-col justify-around text-center p-4 w-full h-[186px] sm:h-[280px] lg:h-[299px] ${!isFirst ? "border-t-2 border-dashed border-[theme(colors.dark.15)] sm:border-t-0" : ""}  ${!isFirst ? "sm:border-l-2 sm:border-dashed sm:border-[theme(colors.dark.15)]" : ""}`}
            >
              <p className="text-base sm:text-lg font-normal font-[var(--font-mono)] text-[var(--color-gray-40)]">
                Step 0{detail.num}
              </p>
              <h1 className="font-medium text-lg sm:text-xl lg:text-2xl mt-1 sm:mt-2 lg:mt-3">
                {detail.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg font-normal mt-2 lg:mt-4 px-2 text-[var(--color-gray-40)]">
                {detail.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
