import ButtonCornerStyle from "@/components/common/ButtonCornerStyle/ButtonCornerStyle";

export interface DataContact {
  image: string;
  title: string;
  paragraph: string;
}

export interface PolicySectionProps {
  header: string;
  buttonDescription: string;
  data: DataContact[];
}

export default function PolicySection({
  header,
  buttonDescription,
  data,
}: PolicySectionProps) {
  return (
    <div className="w-full rounded-xl outline-2 outline-dashed outline-dark-15 mx-auto font-(--font-roboto)">
      {/* Header */}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between mb-0 border-b-2 border-dashed border-dark-15 p-8">
        <h1 className="text-xl font-semibold w-full">{header}</h1>
        <button className="relative flex items-center justify-center  border-2 border-dashed border-dark-15 rounded-xl w-full h-[49px] mt-2 md:w-[295px] md:h-[63px] md:mt-0 p-4">
          <ButtonCornerStyle />
          {buttonDescription}
          <div className="w-5 h-5 ml-2">
            <img
              src="/assets/icons/general/arrow.svg"
              className="transform -rotate-45"
              alt="arrow"
            />
          </div>
        </button>
      </div>
      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-1 w-full rounded-xl">
        {data.map((d, index) => (
          <div
            key={index}
            className=" flex items-center gap-4  border-b-2 border-dashed border-[theme(colors.dark.15)] md:border-b-0 md:border-l-2 p-4 md:w-full md:h-[226px] sm:w-full sm:h-[159px]"
          >
            <img
              src={d.image}
              alt={d.title}
              className="w-14 h-14 sm:w-20 sm:h-20"
            />
            <div className="w-full">
              <h1 className="text-lg font-medium">{d.title}</h1>
              <p className="text-sm font-normal  font-[var(--font-mono)] ">
                {d.paragraph}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
