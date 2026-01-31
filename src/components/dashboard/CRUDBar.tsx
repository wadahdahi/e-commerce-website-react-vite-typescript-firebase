import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  clearSelection,
  deleteProductsByIds,
  setViewMode,
  addNewProduct,
} from "@/redux/slices/productSlice";
import { ICONS, UIcon } from "@/constants/icons";
import ViewListGridToggleButton from "../common/ViewListGridToggleButton/ViewListGridToggleButton";
import AddProductForm from "./AddProductForm";
import { Product } from "@/type";
import { useDeleteHover } from "./FloatingUtilityBar";

interface CRUDBarProps {
  onMobileMenuToggle?: () => void;
}

export default function CRUDBar({ onMobileMenuToggle }: CRUDBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedProductIds = useSelector(
    (state: RootState) => state.product.selectedProductIds,
  );
  const allProducts = useSelector(
    (state: RootState) => state.product.allProducts,
  );
  const { onDeleteEnter, onDeleteLeave } = useDeleteHover();
  const viewMode = useSelector((state: RootState) => state.product.viewMode);

  const [showAddForm, setShowAddForm] = useState(false);

  const selectedCount = selectedProductIds.length;

  const handleDelete = () => {
    if (selectedCount > 0) {
      if (
        confirm(`Are you sure you want to delete ${selectedCount} product(s)?`)
      ) {
        dispatch(deleteProductsByIds(selectedProductIds));
        dispatch(clearSelection());
      }
    } else {
      alert("Please select a product to delete.");
    }
  };

  const handleSaveNewProduct = async (newProduct: Product) => {
    // Add createdAt timestamp
    const productData = {
      ...newProduct,
      createdAt: new Date().toISOString(),
    };

    try {
      // Dispatch action and unwrap result to get the actual returned product with Firebase ID
      const resultAction = await dispatch(addNewProduct(productData));

      if (addNewProduct.fulfilled.match(resultAction)) {
        const addedProduct = resultAction.payload;
        setShowAddForm(false);
        alert(
          `Product "${addedProduct.ProductName}" added successfully with ID: ${addedProduct.id}`,
        );
      } else {
        // Handle rejection based on your slice's error handling
        alert("Failed to add product. Please try again.");
        console.error(
          "Add product failed:",
          resultAction.payload || resultAction.error,
        );
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An unexpected error occurred.");
    }
  };

  const crudButtonClass =
    "flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 text-white rounded font-mono text-xs lg:text-sm transition-all dark:bg-dark-15 dark:hover:bg-white/40 dark:active:bg-white/20";

  const handleCreate = () => {
    dispatch(clearSelection());
    setShowAddForm(!showAddForm);
  };

  const location = useLocation();
  const isProductsPage = location.pathname.includes("products");

  return (
    <>
      <div className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-primary-bg/80 dark:bg-dark-primary-bg/80 backdrop-blur-md dark:text-white z-[9999] border-b-2 border-dark-15 border-dashed lg:border-solid flex items-center justify-between px-4 lg:px-8 shadow-sm transition-all">
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 text-dark-10 dark:text-gray-400 hover:bg-dark-15/10 dark:hover:bg-white/5 rounded-lg active:scale-95"
            title="Open Menu"
          >
            <UIcon icon={ICONS.ACTIONS.TOGGLE_LIST} className="w-6 h-6" />
          </button>
          <div className="font-mono text-base lg:text-xl font-bold truncate text-dark-10 dark:text-white hidden sm:block">
            Admin Dashboard
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-6">
          <div
            className={`flex items-center bg-brown-60 text-white dark:bg-dark-15 rounded gap-1 border border-brown-60/40 border-dashed transition-opacity duration-300 ${!isProductsPage ? "opacity-30 pointer-events-none grayscale" : "opacity-100"}`}
          >
            <ViewListGridToggleButton
              viewMode={viewMode}
              onToggle={() =>
                dispatch(setViewMode(viewMode === "grid" ? "list" : "grid"))
              }
              className="w-6 h-6 lg:w-8 lg:h-8"
            />
          </div>

          <div className="h-8 w-px bg-dark-15 border-l border-dashed mx-1 hidden sm:block"></div>

          <div className="flex gap-2 lg:gap-4">
            <button
              onClick={handleCreate}
              disabled={!isProductsPage}
              className={`${crudButtonClass} bg-brown-80/80 hover:bg-brown-80 dark:bg-dark-15 ${showAddForm ? "ring-2 ring-white/50" : ""} ${!isProductsPage ? "opacity-30 cursor-not-allowed grayscale" : ""}`}
              title={
                isProductsPage
                  ? "Create New Product"
                  : "Available on Products page"
              }
            >
              <UIcon
                icon={ICONS.ACTIONS.ADD}
                className="w-4 h-4 lg:w-5 lg:h-5 grayscale contrast-200 brightness-200"
              />
            </button>

            <button
              onClick={handleDelete}
              disabled={!isProductsPage || selectedCount === 0}
              onMouseEnter={onDeleteEnter}
              onMouseLeave={onDeleteLeave}
              className={`${crudButtonClass} ${!isProductsPage || selectedCount === 0 ? "bg-red-500/30 opacity-30 cursor-not-allowed grayscale" : "bg-brown-80/80 hover:bg-brown-80"}`}
              title={
                !isProductsPage
                  ? "Available on Products page"
                  : selectedCount > 0
                    ? `Delete ${selectedCount} Product(s)`
                    : "Delete Selection"
              }
            >
              <UIcon
                icon={ICONS.ACTIONS.DELETE}
                className="w-4 h-4 lg:w-5 lg:h-5 grayscale contrast-200 brightness-200"
              />
            </button>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed top-16 left-0 lg:left-64 right-0 z-[10003] animate-in slide-in-from-top duration-300">
          <AddProductForm
            onClose={() => setShowAddForm(false)}
            onSave={handleSaveNewProduct}
          />
        </div>
      )}
    </>
  );
}
