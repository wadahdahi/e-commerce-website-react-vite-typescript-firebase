import { Product } from "@/type";
import { MainButton } from "../../MainButton/MainButton";
import RowForProductDetails from "./RowForProductDetails";

export default function ProductDetailsSection({
  ProductName,
  designSummary,
  Status,
  image1,
  image2,
  image3,
  OriginStory,
  Materials,
  MaterialImg,
  features,
  Pricevalue,
  AvialableSize,
}: Product) {
  return (
    <div className="flex flex-col rounded-[20px] border-[1.5px] 2xl:border-2 border-dashed border-dark-15  ">
      <div className="ProductDetails-Top flex flex-col md:flex-row flex-wrap md:justify-between items-start gap-[40px] 2xl:gap-[50px] py-[30px] px-[20px] sm:p-[60px] 2xl:p-[80px] border-b-[1.5px] 2xl:border-b-2 border-dashed border-dark-15">
        <div className="flex flex-col gap-[6px] sm:gap-[10px] 2xl:gap-[14px]">
          <h2 className="font-medium text-[28px] sm:text-[38px] text-5xl leading-[100%] font-roboto dark:text-dark-primary-text text-dark-12">
            {ProductName}
          </h2>
          <div className="flex flex-wrap items-center gap-[12px] 2xl:gap-[16px]">
            <p className="font-normal text-sm sm:text-lg text-[22px] leading-[150%] font-roboto text-gray-40 ">
              {designSummary}
            </p>
            <p className="font-normal text-xs sm:text-sm leading-[150%] font-roboto text-green py-[6px] px-[10px] sm:px-[16px] 2xl:py-[8px] 2xl:px-[20px] bg-green-dark rounded-[100px]">
              {Status}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-[20px] whitespace-nowrap">
          <MainButton
            label="Add To Cart"
            to="/cart"
            hasBorder={true}
            hasDarkBack={true}
            inHeroSection={true}
            addtocart={true}
          />
          <MainButton
            label="Shop Now"
            to="/cart"
            shopBagIcon={true}
            largerWidth={true}
          />
        </div>
      </div>
      <div className="ProductDetails-Bottom">
        <div className="Top-Side w-full border-b-[1.5px] 2xl:border-b-2 border-dashed border-dark-15 flex flex-col md:flex-row gap-[20px] 2xl:gap-[30px] ">
          <div className="p-[10px] md:p-[30px] 2xl:py-[50px] 2xl:px-[30px] w-full md:max-w-[742px] 2xl:max-w-[1084px] border-r-[1.5px] 2xl:border-r-2 border-dashed border-dark-15">
            <img
              src={image1}
              alt="image1"
              className="w-full h-[210px] md:h-[451px] 2xl:h-[604px] object-cover"
            />
          </div>
          <div className=" flex flex-row md:flex-col gap-[20px] md:gap-[20px] 2xl:gap-[30px] p-[10px] md:px-0 md-py-[30px] 2xl:p-[50px] w-full ">
            <img
              src={image2}
              alt="image2"
              className="h-[133px] md:h-[215.5px] 2xl:h-[287px] w-[47%] md:w-full object-cover"
            />
            <img
              src={image3}
              alt="image3"
              className="h-[133px] md:h-[215.5px] 2xl:h-[287px] w-[47%] md:w-full object-cover"
            />
          </div>
        </div>
        <div className="Bottom-Side flex flex-col md:flex-row w-full border-b-[1.5px] 2xl:border-b-2 border-dashed border-dark-15  ">
          <div className="Bottom-Side-Left w-full md:w-[50%] flex flex-col">
            <RowForProductDetails
              isTitle={true}
              Title="Materials, Care and origin"
            />
            <RowForProductDetails
              isLeftSide={true}
              SubTitle="Join Life"
              isGab16={true}
              isDescription={true}
              Description={OriginStory}
            />
            <RowForProductDetails
              isLeftSide={true}
              SubTitle="Materials"
              isGab16={true}
              isDescription={true}
              Description={Materials}
              isMaterial={true}
              MaterialImg={MaterialImg}
            />
          </div>
          <div className="Bottom-Side-Right w-full md:w-[50%] flex flex-col border-l-[1.5px] 2xl:border-l-2 border-dashed border-dark-15">
            <RowForProductDetails
              isTitle={true}
              Title="Features"
              isFeature={true}
              features={features}
            />
            <RowForProductDetails
              isLeftSide={true}
              SubTitle="Price"
              isGab16={false}
              isPrice={true}
              Price={Pricevalue}
            />
            <RowForProductDetails
              isLeftSide={true}
              SubTitle="Available Sizes"
              isGab16={false}
              isAvialableSize={true}
              AvialableSize={AvialableSize}
            />
            <RowForProductDetails
              isLeftSide={true}
              SubTitle="Ratings & Review"
            />
            <RowForProductDetails isRating={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
