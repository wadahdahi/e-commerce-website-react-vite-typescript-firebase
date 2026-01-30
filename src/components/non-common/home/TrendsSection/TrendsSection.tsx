import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { TrendItem } from "@/data/trends";

interface TrendsSectionProps {
  heading: string;
  description: string;
}

function getBorderClasses(
  index: number,
  length: number,
  colsLg = 3,
  colsSm = 2,
) {
  let classes = "border-2 dark:border-[var(--color-dark-15)] border-[var(--color-dark-12)]   border-dashed";
  if (index >= length - 3) classes += " lg:!border-b-0";
  if (index >= length - 2) classes += " sm:!border-b-0";
  if (index === 0 || index % colsLg === 0)
    classes += " lg:border-l-0 lg:border-r-0 lg:border-t-0";
  else classes += " lg:border-t-0 lg:border-r-0 lg:border-l-2";
  if (index % colsSm === 0)
    classes += " sm:border-l-0 sm:border-t-0 sm:border-r-2";
  else classes += " sm:border-l-0 sm:border-t-0 sm:border-r-0";
  classes += " border-t-0 border-l-0 border-r-0";
  return classes;
}

export default function TrendsSection({
  heading,
  description,
}: TrendsSectionProps) {
  const trends = useSelector((state: RootState) => state.trends.items);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedItems = isMobile && !showAll ? trends.slice(0, 3) : trends;

  return (
    <section className="flex flex-col mb-[50px] xl:mb-[80px] 2xl:mb-[100px] border-[var(--color-dark-12)] dark:border-[var(--color-dark-15)] border-2 border-dashed rounded-2xl">
      <div className="2xl:p-20 xl:p-15 py-7.5 px-5 border-[var(--color-dark-12)] dark:border-[var(--color-dark-15)] border-b-2 border-dashed">
        <h2 className="2xl:text-5xl text-[28px] xl:text-[38px] font-medium 2xl:mb-7.5 xl:mb-6 mb-5 uppercase">{heading}</h2>
        <p className="text-[var(--color-gray-40)] text-sm 2xl:text-lg xl:text-base">{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {displayedItems.map((item: TrendItem, index: number) => (
          <div
            key={index}
            className={`relative overflow-hidden  p-7.5 xl:p-12.5 2xl:p-15 flex flex-col  
              ${getBorderClasses(index, displayedItems.length)}`}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="2xl:w-23.5 2xl:h-23.5 w-19 h-19  mb-6 xl:mb-10 2xl:mb-12.5"
            />
            <h3 className="font-medium text-lg 2xl:text-2xl xl:text-xl ">
              {item.title}
            </h3>
            <p className="text-[var(--color-gray-50)] text-sm 2xl:text-lg xl:text-base 2xl:mt-4 xl:mt-3 mt-2.5">
              {item.description}
            </p>
            <img
              className="absolute -top-7 right-1 2xl:top-0  2xl:-right-1.75 xl:right-1 xl:-top-6 w-41.5 h-41.5 xl:w-37.5 xl:h-41.5 2xl:w-46 2xl:h-51.25"
              src={item.imagePosition}
              alt="icon"
            />
          </div>
        ))}
      </div>

      {isMobile && trends.length > 3 && (
        <div className="flex justify-center py-7.5">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="flex items-center gap-2.5 text-base font-normal font-robotmono text-[var(--color-gray-70)] hover:text-color-gray-70"
          >
            {showAll ? (
              <>
                View Less
                <FaArrowUp className="text-lg" />
              </>
            ) : (
              <>
                View All
                <FaArrowDown className="text-lg" />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
