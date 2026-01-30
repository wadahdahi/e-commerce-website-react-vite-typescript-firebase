import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { 
    collection, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    query, 
    orderBy,
    writeBatch
} from "firebase/firestore";
import { db } from "@/config/Firebase";
import type { FilterType, Product, ProductState } from "@/type";
import { groupByCategory } from "@/utils/groupByCategory";

const initialState: ProductState = {
    allProducts: [],
    activeType: "Women" as FilterType,
    filteredProducts: [],
    activeTypeForSections: "Women",
    filteredSections: [],
    selectedProductIds: [],
    viewMode: 'grid',
    isDeleteHovered: false,
    currentPage: 0,
    listVisibleCount: 100,
    status: 'idle',
    error: null
};

// Async Thunks
export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() } as Product);
        });
        return products;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const addNewProduct = createAsyncThunk('product/addNewProduct', async (product: Omit<Product, 'id'>, { rejectWithValue }) => {
    try {
        const docRef = await addDoc(collection(db, "products"), product);
        return { id: docRef.id, ...product } as Product;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const updateExistingProduct = createAsyncThunk('product/updateExistingProduct', async (product: Product, { rejectWithValue }) => {
    try {
        const { id, ...data } = product;
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, data as any);
        return product;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const deleteProductById = createAsyncThunk('product/deleteProductById', async (id: string, { rejectWithValue }) => {
    try {
        await deleteDoc(doc(db, "products", id));
        return id;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const deleteProductsByIds = createAsyncThunk('product/deleteProductsByIds', async (ids: string[], { rejectWithValue }) => {
    try {
        const batch = writeBatch(db);
        ids.forEach(id => {
            const docRef = doc(db, "products", id);
            batch.delete(docRef);
        });
        await batch.commit();
        return ids;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setActiveType(state, action: PayloadAction<FilterType>) {
            state.activeType = action.payload;
            state.currentPage = 0;

            if (action.payload === "All") {
                state.filteredProducts = state.allProducts;
            } else {
                state.filteredProducts = state.allProducts
                    .filter(product => product.type === action.payload);
            }
             // Re-sort after filtering to ensure consistency
             state.filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        },
        setFilteredSections(state, action: PayloadAction<FilterType>) {
            state.activeTypeForSections = action.payload;
            const products = action.payload === "All"
                ? state.allProducts
                : state.allProducts.filter(p => p.type === action.payload);
            const grouped = groupByCategory(products);
            state.filteredSections = grouped.map(group => ({
                category: group.category,
                products: group.products,
                showAll: false,
            }));
        },
        toggleProductSelection(state, action: PayloadAction<string>) {
            const id = action.payload;
            if (state.selectedProductIds.includes(id)) {
                state.selectedProductIds = state.selectedProductIds.filter(selectedId => selectedId !== id);
            } else {
                state.selectedProductIds.push(id);
            }
        },
        clearSelection(state) {
            state.selectedProductIds = [];
        },
        selectAll(state, action: PayloadAction<string[]>) {
            state.selectedProductIds = action.payload;
        },
        setViewMode(state, action: PayloadAction<'grid' | 'list'>) {
            state.viewMode = action.payload;
        },
        setDeleteHovered(state, action: PayloadAction<boolean>) {
            state.isDeleteHovered = action.payload;
        },
        loadMoreListItems(state) {
            state.listVisibleCount += 100;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allProducts = action.payload;
                // Initialize filtered products based on activeType
                if (state.activeType === "All") {
                    state.filteredProducts = action.payload;
                } else {
                    state.filteredProducts = action.payload.filter(p => p.type === state.activeType);
                }
                 state.filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // Add Product
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.allProducts.push(action.payload);
                if (state.activeType === 'All' || state.activeType === action.payload.type) {
                    state.filteredProducts.push(action.payload);
                    state.filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                }
            })
            // Update Product
            .addCase(updateExistingProduct.fulfilled, (state, action) => {
                const index = state.allProducts.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.allProducts[index] = action.payload;
                    const filteredIndex = state.filteredProducts.findIndex(p => p.id === action.payload.id);
                    if (filteredIndex !== -1) {
                        state.filteredProducts[filteredIndex] = action.payload;
                    }
                }
            })
            // Delete Product
            .addCase(deleteProductById.fulfilled, (state, action) => {
                const id = action.payload;
                state.allProducts = state.allProducts.filter(p => p.id !== id);
                state.filteredProducts = state.filteredProducts.filter(p => p.id !== id);
                state.selectedProductIds = state.selectedProductIds.filter(sid => sid !== id);
            })
             // Delete Multiple Products
             .addCase(deleteProductsByIds.fulfilled, (state, action) => {
                const ids = action.payload;
                state.allProducts = state.allProducts.filter(p => !ids.includes(p.id));
                state.filteredProducts = state.filteredProducts.filter(p => !ids.includes(p.id));
                state.selectedProductIds = state.selectedProductIds.filter(sid => !ids.includes(sid));
            });
    }
});

export const { setActiveType, setFilteredSections, toggleProductSelection, clearSelection, selectAll, setViewMode, setDeleteHovered, setCurrentPage, loadMoreListItems } = productSlice.actions;
export default productSlice.reducer;
