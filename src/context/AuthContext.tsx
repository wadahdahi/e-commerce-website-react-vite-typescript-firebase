import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/Firebase";

export interface AuthContextType {
  user: User | null;
  role: "admin" | "user" | null;
  loading: boolean;
  isAdmin: boolean;
  isBanned: boolean; // NEW
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [isBanned, setIsBanned] = useState(false); // NEW
  const [loading, setLoading] = useState(true);

  // FETCH USER ROLE & STATUS FROM FIRESTORE
  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setRole(userData.role || "user");
        setIsBanned(!!userData.isBanned);
      } else {
        // DOCUMENT MISSING -> USER WAS DELETED FROM FIRESTORE
        // WE MUST CLEAR THE SESSION
        await firebaseSignOut(auth);
        setUser(null);
        setRole(null);
        setIsBanned(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setRole("user");
      setIsBanned(false);
    }
  };

  // AUTH STATE LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // KEEP LOADING TRUE WHILE WE RESOLVE FIRESTORE
      setLoading(true);

      if (currentUser) {
        setUser(currentUser);
        // WAIT FOR REAL DATABASE VALIDATION BEFORE SHOWING UI
        await fetchUserData(currentUser.uid);
      } else {
        setUser(null);
        setRole(null);
        setIsBanned(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, name: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    setRole(null);
    setIsBanned(false);
  };

  const isAdmin = role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        isAdmin,
        isBanned, // NEW
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
