import ProductDetailsSection from "@/components/common/products/ProductDetailsSection/ProductDetailsSection";
import TestimonialsSection from "@/components/common/sections/TestimonialsSection/TestimonialsSection";
import FAQSection from "@/components/common/sections/FAQSection/FAQSection";
import CTASection from "@/components/common/sections/CTASection/CTASection";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = useSelector((state: RootState) =>
    state.product.allProducts.find((p) => p.id === id),
  );
  return (
    <div className="flex flex-col gap-[40px]">
      {product && <ProductDetailsSection {...product} />}
      <TestimonialsSection />
      <FAQSection />
      <CTASection
        title="elevate your wardrobe"
        description="Don't miss out – experience the epitome of fashion by clicking 'Buy Now' and embrace a world of chic elegance delivered to your doorstep. Your style journey begins here."
      />
    </div>
  );
}
