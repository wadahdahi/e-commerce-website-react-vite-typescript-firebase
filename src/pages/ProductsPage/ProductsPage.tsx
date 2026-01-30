import TestimonialsSection from "@/components/common/sections/TestimonialsSection/TestimonialsSection";
import FAQSection from "@/components/common/sections/FAQSection/FAQSection";
import CTASection from "@/components/common/sections/CTASection/CTASection";
import ProductsSection from "@/components/common/products/ProductsSection/ProductsSection";
// REDUX - DATA
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setActiveType } from "@/redux/slices/productSlice";
import { SectionDataProducts } from "@/data/productsHeadData";
export default function ProductsPage() {
  const dispatch = useDispatch();
  const activeType = useSelector(
    (state: RootState) => state.product.activeType,
  );
  const filteredProducts = useSelector(
    (state: RootState) => state.product.filteredProducts,
  );
  return (
    <div className="flex flex-col gap-[40px]">
      <ProductsSection
        image={SectionDataProducts.image}
        alt={SectionDataProducts.alt}
        hight={SectionDataProducts.hight}
        imgwidth={SectionDataProducts.imgwidth}
        heading={SectionDataProducts.heading}
        text={SectionDataProducts.text}
        showTabs={SectionDataProducts.showTabs}
        tabs={["All", "Men", "Women", "Kids"]}
        activeTab={activeType}
        onChange={(tab) => dispatch(setActiveType(tab))}
        products={filteredProducts}
        mode="products"
      />
      <TestimonialsSection />
      <FAQSection />
      <CTASection
        title="elevate your wardrobe"
        description="Don't miss out – experience the epitome of fashion by clicking 'Buy Now' and embrace a world of chic elegance delivered to your doorstep. Your style journey begins here."
      />
    </div>
  );
}
