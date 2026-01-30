import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { setHeroTab } from "../../../../redux/slices/HeroTabs";
import { useDispatch, useSelector } from "react-redux";
import FilterTabs from "@/components/common/FilterTabs/FilterTabs";
import { MainButton } from "@/components/common/MainButton/MainButton";
import { Reveal } from "@/components/common/Motion/Reveal";
export default function HeroSection() {
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secNumber, setSecNumber] = useState<number>(0);
  const dispatch = useDispatch();
  const activeTab = useSelector(
    (state: RootState) => state.heroSlice.activeTab,
  );
  const tabDetails = useSelector(
    (state: RootState) => state.heroSlice.tabDetails,
  );

  const MAX_FIRST = 1500;
  const MAX_SECOND = 30;
  const DURATION = 1500; // ms
  const INTERVAL = 10;

  useEffect(() => {
    let start = 0;
    const steps = DURATION / INTERVAL;
    const interval = setInterval(() => {
      start++;

      setFirstNumber(
        Math.min(Math.round((MAX_FIRST / steps) * start), MAX_FIRST),
      );
      setSecNumber(
        Math.min(Math.round((MAX_SECOND / steps) * start), MAX_SECOND),
      );

      if (start >= steps) {
        clearInterval(interval);
      }
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="pb-[100px] max-2xl:pb-[80px] max-md:pb-[50px]">
      <div className="flex flex-col items-center justify-center relative">
        <img
          className="2xl:h-[624px] lg:h-[442px] md:h-[300px] h-[250px] w-full
          rounded-tl-[20px] rounded-tr-[20px] object-cover"
          src="/assets/images/hero-home.webp"
          alt="Hero Image"
        />
        <div
          className="flex flex-row items-center justify-center 2xl:w-[198px] 2xl:h-[101px] lg:w-[165px] lg:h-[80px]
             w-[145px] h-[65px]  rounded-tl-[20px] rounded-tr-[20px] dark:bg-dark-primary-bg
               bg-primary-bg absolute lg:top-[95%] md:top-[93%] top-[90%]"
        >
          <MainButton
            label="Shop Now"
            to="/products"
            shopNowButton={true}
            hasBorder={true}
            hasDarkBack={true}
            inHeroSection={true}
            arrowIcon={true}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 grid-cols-1 w-full border-2 border-dark-15 border-t-0 border-dashed rounded-bl-[20px] rounded-br-[20px]">
        <div className="2xl:px-[80px] xl:px-[60px] lg:px-[40px] lg:min-h-[450px] md:min-h-[420px] px-[20px] sm:py-[80px] pt-[50px] pb-[20px] sm:border-r-2 sm:border-b-0 border-b-2 border-dark-15 border-dashed">
          <div className="flex flex-row lg:gap-6 md:gab-4 gap-3">
            <FilterTabs
              tabs={["All", "Men", "Women", "Kids"]}
              activeTab={activeTab}
              onChange={(tab) => dispatch(setHeroTab(tab))}
              type="Hero"
            />
          </div>

          <Reveal variant="blur" blurInitial={4} duration={2}>
            <div className="dark:text-primary-text 2xl:text-5xl lg:text-4xl text-[28px] font-medium uppercase 2xl:mt-[30px] lg:mt-[20px] mt-[16px] font-roboto">
              {tabDetails[activeTab].title}
            </div>
          </Reveal>

          <div className="overflow-y-auto text-gray-40 2xl:text-lg xl:text-base text-[12px] font-normal 2xl:mt-[30px] lg:mt-[20px] mt-[16px] font-roboto">
            {tabDetails[activeTab].description}
          </div>
        </div>

        <div className="grid grid-cols-2 font-roboto">
          <div className="flex flex-col justify-center items-start lg:px-[50px] px-[30px] 2xl:py-[65px] lg:py-[55px] py-[40px] border-r-2 border-b-2 border-dark-15 border-dashed">
            <div className="flex flex-row items-center justify-center dark:text-primary-text text-dark-primary-bg">
              <div className="2xl:text-[50px] lg:text-[34px] text-[30px] font-medium">
                {firstNumber}
              </div>
              <span className="lg:text-[30px] text-[20px] font-meduim ml-[10px] ">
                +
              </span>
            </div>
            <div className="text-gray-50 font-normal 2xl:text-lg xl:text-base text-[12px]">
              Fashion Products
            </div>
          </div>
          <div className="flex flex-col justify-center items-start lg:px-[50px] px-[30px] 2xl:py-[65px] lg:py-[55px] py-[40px] border-b-2 border-dark-15 border-dashed">
            <div className="flex flex-row items-center justify-center text-dark-primary-bg dark:text-primary-text">
              <div className="2xl:text-[50px] lg:text-[34px] text-[30px] font-medium">
                {secNumber}
              </div>
              <span className="lg:text-[30px] text-[20px] font-meduim ml-[10px]">
                +
              </span>
            </div>
            <div className="text-gray-50 font-normal 2xl:text-lg xl:text-base text-[12px]">
              New arrivals every month.
            </div>
          </div>

          <div className="flex flex-col justify-center items-start lg:px-[50px] px-[30px] 2xl:py-[65px] lg:py-[55px] py-[40px] border-r-2 border-dark-15 border-dashed">
            <div className="flex flex-row items-center justify-center dark:text-primary-text text-dark-primary-bg">
              <div className="2xl:text-[50px] lg:text-[34px] text-[30px] font-medium">
                30
              </div>
              <span className="lg:text-[30px] text-[20px] font-meduim">%</span>
            </div>
            <div className="text-gray-50 font-normal 2xl:text-lg xl:text-base text-[12px]">
              OFF on select items.
            </div>
          </div>

          <div className="flex flex-col justify-center items-start lg:px-[50px] px-[30px] 2xl:py-[65px] lg:py-[55px] py-[40px]">
            <div className="flex flex-row items-center justify-center dark:text-primary-text text-dark-primary-bg">
              <div className="2xl:text-[50px] lg:text-[34px] text-[30px] font-medium">
                95
              </div>
              <span className="lg:text-[30px] text-[20px] font-meduim">%</span>
            </div>
            <div className="text-gray-50 font-normal 2xl:text-lg xl:text-base text-[12px]">
              Customer Satisfaction Rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
