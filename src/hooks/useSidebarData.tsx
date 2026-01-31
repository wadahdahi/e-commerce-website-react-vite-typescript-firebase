import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/context/AuthContext";
import { RootState, AppDispatch } from "@/redux/store";
import {
  addNewProduct,
  updateExistingProduct,
} from "@/redux/slices/productSlice";
import { Product } from "@/type";
import { ICONS, UIcon } from "@/constants/icons";
import { IMAGES } from "@/constants/images";

// PAGES PATH CONSTANT
export const PAGES = [
  {
    name: "Overview",
    path: "/overview",
    icon: <UIcon icon={ICONS.NAV.OVERVIEW} />,
    shortcutKey: ["o", "O", "خ"],
  },
  {
    name: "Products",
    path: "/products",
    icon: <UIcon icon={ICONS.NAV.PRODUCTS} />,
    shortcutKey: ["p", "P", "ح"],
  },
  {
    name: "Users",
    path: "/users",
    icon: <UIcon icon={ICONS.NAV.ACCOUNT} />,
    shortcutKey: ["u", "U", "ع"],
  },
  {
    name: "Home",
    path: "/",
    icon: <UIcon icon={ICONS.NAV.HOME} />,
    shortcutKey: ["h", "H", "ا"],
  },
  {
    name: "Contact",
    path: "/contact",
    icon: <UIcon icon={ICONS.NAV.CONTACT} />,
    shortcutKey: ["c", "C", "ؤ"],
  },
  {
    name: "Cart",
    path: "/cart",
    icon: <UIcon icon={ICONS.NAV.CART} />,
    shortcutKey: ["t", "T", "ف"],
  },
];

export const useSidebarLogic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const selectedProductIds = useSelector(
    (state: RootState) => state.product.selectedProductIds,
  );
  const allProducts = useSelector(
    (state: RootState) => state.product.allProducts,
  );

  const [formData, setFormData] = useState<Partial<Product>>({
    ProductName: "",
    designSummary: "",
    Pricevalue: "",
    category: "",
    type: "Women",
  });

  const [isNavOpen, setIsNavOpen] = useState(false);

  const selectedCount = selectedProductIds.length;
  const isMuted = selectedCount !== 1;
  const isProductsPage = location.pathname.includes("products");

  const activePage =
    PAGES.find((p) =>
      p.path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(p.path),
    ) || PAGES[0];

  useEffect(() => {
    if (selectedCount > 0) {
      const targetId = selectedProductIds[selectedCount - 1];
      const product = allProducts.find((p) => p.id === targetId);
      if (product) {
        setFormData({ ...product });
      }
    } else {
      setFormData({
        ProductName: "",
        designSummary: "",
        Pricevalue: "",
        category: "",
        type: "Women",
      });
    }
  }, [selectedProductIds, allProducts, selectedCount]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (key: keyof Product, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    if (!formData.ProductName || !formData.Pricevalue) {
      alert("Name and Price are required!");
      return;
    }

    const productToSave: Product = {
      ...formData,
      id: selectedCount === 1 ? selectedProductIds[0] : "", // ID is not needed for new product creation here
      createdAt: formData.createdAt || new Date().toISOString(),
      ProductImage: formData.ProductImage || IMAGES.PLACEHOLDER.PRODUCT,
      Fitvalue: formData.Fitvalue || "Regular Fit",
      Status: formData.Status || "In Stock",
      image1: formData.image1 || "",
      image2: formData.image2 || "",
      image3: formData.image3 || "",
      OriginStory: formData.OriginStory || "",
      Materials: formData.Materials || "",
      MaterialImg: formData.MaterialImg || "",
      features: formData.features || [],
      AvialableSize: formData.AvialableSize || ["S", "M", "L"],
    } as Product;

    if (selectedCount === 1) {
      dispatch(updateExistingProduct(productToSave));
      alert("Product updated!");
    } else if (selectedCount === 0) {
      // Omit ID for new product
      const { id, ...newProductData } = productToSave;
      dispatch(addNewProduct(newProductData));
      alert("Product added!");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return {
    formData,
    isNavOpen,
    setIsNavOpen,
    selectedCount,
    isMuted,
    activePage,
    isProductsPage,
    handleChange,
    handleSave,
    handleLogout,
    onImageChange,
    pages: PAGES,
  };
};
