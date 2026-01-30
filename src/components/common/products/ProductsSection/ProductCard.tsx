import { Link } from "react-router-dom";
import { MainButton } from "../../MainButton/MainButton";
import type { Product } from "@/type";

interface ProductCardProps {
  product: Product;
  index: number;
  totalCount: number;
  isInGroup?: boolean;
}

import { useAuth } from "@/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleProductSelection } from "@/redux/slices/productSlice";
import { RootState } from "@/redux/store";

export default function ProductCard({
  product,
  index,
  totalCount,
}: ProductCardProps) {
  const { isAdmin } = useAuth();
  const dispatch = useDispatch();
  const selectedProductIds = useSelector(
    (state: RootState) => state.product.selectedProductIds,
  );

  const isSelected = selectedProductIds.includes(product.id);

  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent navigation when clicking checkbox
    e.stopPropagation();
    dispatch(toggleProductSelection(product.id));
  };
  // Generate responsive border classes
  const getBorderClasses = () => {
    const baseClass = "border-2 border-dashed border-dark-15";

    // Calculate border positions
    const isFirstInRowLG = index % 3 === 0;
    const isLastInRowLG = index % 3 === 2;
    const isFirstInRowSM = index % 2 === 0;

    const responsiveClasses = [
      // Large screens
      isFirstInRowLG
        ? "lg:border-l-0 lg:border-r-0"
        : isLastInRowLG
          ? "lg:border-l-0 lg:border-r-0"
          : "lg:border-l-2 lg:border-r-2",

      // Medium screens
      isFirstInRowSM
        ? "sm:border-l-0 sm:border-r-2"
        : "sm:border-l-2 sm:border-r-0",

      // Common classes
      "lg:border-t-0 lg:border-b-2",
      "sm:border-t-0 sm:border-b-2",
      "border-l-0 border-r-0 border-t-0 border-b-2",
      "md:border-l-0",
    ];

    // Remove bottom borders for last row
    const isLastRowLG =
      Math.floor(index / 3) === Math.floor((totalCount - 1) / 3);
    const isLastRowSM =
      Math.floor(index / 2) === Math.floor((totalCount - 1) / 2);

    if (isLastRowLG) responsiveClasses.push("lg:border-b-0 ");
    if (isLastRowSM) responsiveClasses.push("sm:border-b-0");
    if (index === totalCount - 1) responsiveClasses.push("border-b-0");

    return `${baseClass} ${responsiveClasses.join(" ")}`;
  };

  const borderClasses = getBorderClasses();

  const isDeleteHovered = useSelector(
    (state: RootState) => state.product.isDeleteHovered,
  );
  const pendingDeleteClass =
    isDeleteHovered && isSelected ? "opacity-50 line-through grayscale" : "";

  return (
    <div
      className={`relative flex items-center justify-center p-5 2xl:p-8 ${borderClasses} ${isSelected ? "bg-brown-90/40 ring-2 ring-brown-60 z-10" : ""}`}
    >
      {/* Admin Selection Checkbox */}
      {isAdmin && (
        <div
          className="absolute top-4 left-4 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelection}
            className="w-6 h-6 cursor-pointer accent-brown-60 rounded border-gray-300"
            aria-label={`Select ${product.ProductName} for editing`}
          />
        </div>
      )}

      <div
        className={`flex flex-col gap-5 md:gap-6 2xl:gap-8 h-full w-full ${pendingDeleteClass}`}
      >
        <div className="relative">
          <img
            src={product.ProductImage}
            alt={product.ProductName}
            className="w-full rounded-t-[50px] h-56 xl:h-72 2xl:h-96 object-cover"
            loading="lazy"
          />
          {/* Overlay for delete hover */}
          {isDeleteHovered && isSelected && (
            <div className="absolute inset-0 bg-gray-500/30 rounded-t-[50px] pointer-events-none z-10 transition-colors duration-300"></div>
          )}
        </div>

        <div className="flex flex-col gap-5 md:gap-4 2xl:gap-5">
          <div className="flex justify-between items-center">
            <span className="category py-2 px-3 2xl:py-2.5 2xl:px-4 rounded-full border border-dashed border-dark-15 bg-dark-10 text-sm 2xl:text-lg text-gray-70 font-mono">
              {product.category}
            </span>

            <div className="hidden sm:block">
              <MainButton
                label="Shop Now"
                to={`/products/${product.id}`}
                shopNowButton={true}
                hasBorder={true}
                hasDarkBack={true}
                arrowIcon={true}
                className={
                  isDeleteHovered && isSelected
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 2xl:gap-3.5">
            <h3 className="font-medium text-lg 2xl:text-2xl text-dark-primary-bg dark:text-primary-text font-roboto line-clamp-1">
              <Link to={`/products/${product.id}`}>{product.ProductName}</Link>
            </h3>

            <div className="flex gap-2.5 md:gap-4 2xl:gap-5 font-mono">
              <div className="flex items-center gap-1.5 md:gap-1 2xl:gap-2">
                <span className="text-sm 2xl:text-lg text-gray-50">Fit</span>
                <div className="w-1 h-1 rounded-full bg-dark-30"></div>
                <span className="font-medium text-sm md:text-base 2xl:text-xl text-dark-primary-bg dark:text-gray-80">
                  {product.Fitvalue}
                </span>
              </div>

              <div className="flex items-center gap-1.5 md:gap-1 2xl:gap-2">
                <span className="text-sm 2xl:text-lg text-gray-50">Price</span>
                <div className="w-1 h-1 rounded-full bg-dark-30"></div>
                <span className="font-medium text-sm md:text-base 2xl:text-xl text-dark-primary-bg dark:text-gray-80">
                  {product.Pricevalue}
                </span>
              </div>
            </div>
          </div>

          <div className="block sm:hidden w-full">
            <MainButton
              to={`/products/${product.id}`}
              hasBorder={true}
              hasFullWidthInCard={true}
              hasDarkBack={true}
              arrowIcon={true}
              label="Shop Now"
              className={
                isDeleteHovered && isSelected
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
