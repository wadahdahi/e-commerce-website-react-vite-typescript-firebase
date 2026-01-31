import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "@/redux/store";
import {
  clearSelection,
  selectAll,
  deleteProductsByIds,
  setViewMode,
} from "@/redux/slices/productSlice";
import { ITEMS_PER_PAGE } from "@/components/common/products/ProductsSection/ProductsSection";
import { Product } from "@/type";
import { PAGES } from "@/hooks/useSidebarData";

export const useAdminActions = (isSidebarOpen: boolean = false) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    selectedProductIds,
    filteredProducts,
    currentPage,
    viewMode,
    listVisibleCount,
  } = useSelector((state: RootState) => state.product);

  const selectedCount = selectedProductIds.length;

  // --- DYNAMIC KEYBOARD SHORTCUTS LOGIC ---
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // IGNORE IF MODIFIER KEYS ARE PRESSED (LIKE CTRL+C, ALT+TAB, etc.)
      if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
        return;
      }

      // CHECK IF SIDEBAR IS VISIBLE (ALWAYS ON DESKTOP, OPEN ON MOBILE)
      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop && !isSidebarOpen) return;

      const activeElement = document.activeElement;
      const isTyping =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement;

      if (isTyping) return;

      const pressedKey = event.key;
      const targetPage = PAGES.find((page) =>
        page.shortcutKey.includes(pressedKey)
      );

      if (targetPage) {
        navigate(targetPage.path);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate, isSidebarOpen]);

  // --- ACTIONS LOGIC ---
  const handleSelectAll = () => {
    if (viewMode === "list") {
      const visibleItems = filteredProducts.slice(0, listVisibleCount);
      const ids = visibleItems.map((p: Product) => p.id);
      dispatch(selectAll(ids));
    } else {
      const startIndex = currentPage * ITEMS_PER_PAGE;
      const itemsOnPage = filteredProducts.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
      );
      const ids = itemsOnPage.map((p: Product) => p.id);
      dispatch(selectAll(ids));
    }
  };

  const handleQuickDelete = () => {
    if (
      window.confirm(
        "ARE YOU SURE? THIS IS PERMANENT! All selected items will be deleted."
      )
    ) {
      if (
        window.confirm(
          "FINAL WARNING: This action CANNOT be undone. Proceed with deleting all selected products?"
        )
      ) {
        dispatch(deleteProductsByIds(selectedProductIds));
      }
    }
  };

  const handleExportCSV = () => {
    const selectedData = filteredProducts.filter((p: Product) =>
      selectedProductIds.includes(p.id)
    );
    if (selectedData.length === 0) return;

    const headers = [
      "ID",
      "Name",
      "Category",
      "Price",
      "Type",
      "Fit",
      "Created At",
    ];
    const rows = selectedData.map((p: Product) => [
      p.id,
      `"${p.ProductName}"`,
      `"${p.category}"`,
      `"${p.Pricevalue}"`,
      `"${p.type}"`,
      `"${p.Fitvalue}"`,
      `"${p.createdAt}"`,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `styleloom_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearSelection = () => dispatch(clearSelection());

  const handleToggleViewMode = () =>
    dispatch(setViewMode(viewMode === "grid" ? "list" : "grid"));

  return {
    selectedCount,
    viewMode,
    handleSelectAll,
    handleQuickDelete,
    handleExportCSV,
    handleClearSelection,
    handleToggleViewMode,
  };
};
