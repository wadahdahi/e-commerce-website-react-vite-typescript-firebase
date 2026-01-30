import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import type { Product } from "@/type";
import ProductCard from "./ProductCard";
import ViewAllButton from "./ViewAllButton";

interface CategoryContainerProps {
  categoryKey: string;
  title: string;
  products: Product[];
  showAll: boolean;
  isMobile: boolean;
  isTablet: boolean;
  onToggleShowAll: (categoryKey: string) => void;
}

export default function CategoryContainer({
  categoryKey,
  title,
  products,
  showAll,
  isMobile,
  isTablet,
  onToggleShowAll,
}: CategoryContainerProps) {
  if (products.length === 0) return null;

  // Calculate visible products based on screen size
  const getVisibleCount = () => {
    if (showAll) return products.length;
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const visibleCount = getVisibleCount();
  const visibleProducts = products.slice(0, visibleCount);
  const shouldShowViewAll = products.length > (isTablet ? 2 : 3);

  return (
    <div className="productsContainer flex flex-col last:mb-0 ">
      {/* Header with title and View All button */}
      <div className="flex justify-between items-center p-6 2xl:p-8 border-y-2 md:border-t-0 border-dashed border-dark-15">
        <h2 className="font-medium text-2xl sm:text-2xl 2xl:text-3xl leading-tight font-roboto text-dark-primary-bg dark:text-primary-text">
          {title}
        </h2>

        {shouldShowViewAll && (
          <div className="hidden sm:block">
            <ViewAllButton
              label={showAll ? "View Less" : "View All"}
              onClick={() => onToggleShowAll(categoryKey)}
            />
          </div>
        )}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            totalCount={visibleProducts.length}
            isInGroup={true}
          />
        ))}
      </div>

      {/* Mobile View All button */}
      {shouldShowViewAll && isMobile && (
        <div className="">
          <button
            onClick={() => onToggleShowAll(categoryKey)}
            className="w-full py-8 dark:text-gray-70 text-dark-primary-bg text-base font-mono flex items-center justify-center gap-2 border-b-2 border-dashed rounded-2xl border-dark-15"
            aria-label={showAll ? "View Less" : "View All"}
          >
            {showAll ? "View Less" : "View All"}
            <span className="ml-2.5 text-sm">
              {showAll ? <FaArrowUp /> : <FaArrowDown />}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
