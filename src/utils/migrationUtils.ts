import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/Firebase";
import { ProductsCardsData } from "@/data/ProductsCardsData";

export const migrateDataToFirebase = async () => {
    try {
        console.log("Starting migration...");
        
        // 1. Check if products already exist to avoid duplication
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        
        if (!snapshot.empty) {
            console.warn("Products collection is not empty. Clearing existing data...");
             // OPTIONAL: Delete existing data to ensure fresh start
             const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, "products", d.id)));
             await Promise.all(deletePromises);
             console.log("Existing data cleared.");
        }

        // 2. Upload data
        const uploadPromises = ProductsCardsData.map(async (product) => {
            // Remove the hardcoded ID and let Firestore generate one, 
            // OR keep it if we want to preserve it (but Firestore IDs are usually strings like 'AbCd...')
            // Since we updated our app to handle string IDs, we can just let Firestore generate unique IDs.
            // But if we want to keep the "1", "2" IDs as document keys, we can use setDoc.
            // Using addDoc is safer for auto-id.
            
            // Note: We need to cast 'id' or omit it. Since we define product with ID, let's omit it.
            const { id, ...productData } = product;
            
            await addDoc(productsRef, {
                ...productData,
                // Ensure createdAt is a valid format or keep as string
                createdAt: product.createdAt || new Date().toISOString()
            });
        });

        await Promise.all(uploadPromises);
        console.log(`Successfully migrated ${ProductsCardsData.length} products to Firestore.`);
        return true;
    } catch (error) {
        console.error("Migration failed:", error);
        return false;
    }
};
