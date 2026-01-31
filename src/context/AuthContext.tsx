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

const AUTH_CACHE_KEY = "style_loom_auth_role";
const BAN_CACHE_KEY = "style_loom_auth_banned";
const UID_CACHE_KEY = "style_loom_auth_uid";

export interface AuthContextType {
  user: User | null;
  role: "admin" | "user" | null;
  loading: boolean;
  isAdmin: boolean;
  isBanned: boolean;
  userName: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"admin" | "user" | null>(() => {
    return (localStorage.getItem(AUTH_CACHE_KEY) as "admin" | "user") || null;
  });
  const [isBanned, setIsBanned] = useState(() => {
    return localStorage.getItem(BAN_CACHE_KEY) === "true";
  });
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // FETCH USER ROLE & STATUS FROM FIRESTORE
  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const newRole = userData.role || "user";
        const newBanned = !!userData.isBanned;
        const newName = userData.name || userData.displayName || null;

        setRole(newRole);
        setIsBanned(newBanned);
        setUserName(newName);

        // SYNC CACHE
        localStorage.setItem(AUTH_CACHE_KEY, newRole);
        localStorage.setItem(BAN_CACHE_KEY, String(newBanned));
        localStorage.setItem(UID_CACHE_KEY, uid);
      } else {
        // DOCUMENT MISSING -> USER WAS DELETED FROM FIRESTORE
        await firebaseSignOut(auth);
        clearAuthCache();
        setUser(null);
        setRole(null);
        setIsBanned(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // DON'T OVERWRITE ROLE ON ERROR TO PREVENT FLASHING
    }
  };

  const clearAuthCache = () => {
    localStorage.removeItem(AUTH_CACHE_KEY);
    localStorage.removeItem(BAN_CACHE_KEY);
    localStorage.removeItem(UID_CACHE_KEY);
  };

  // AUTH STATE LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // CHECK IF CACHE MATCHES CURRENT USER
        const cachedUid = localStorage.getItem(UID_CACHE_KEY);
        if (cachedUid === currentUser.uid && role) {
          // WE HAVE CACHED DATA FOR THIS USER, STOP LOADING IMMEDIATELY
          setLoading(false);
          // STILL FETCH FRESH DATA IN BACKGROUND
          fetchUserData(currentUser.uid);
        } else {
          // NO CACHE OR DIFFERENT USER -> MUST WAIT
          setLoading(true);
          await fetchUserData(currentUser.uid);
          setLoading(false);
        }
      } else {
        clearAuthCache();
        setUser(null);
        setRole(null);
        setIsBanned(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [role]); // RE-RUN IF ROLE CHANGES MANUALLY (LIKE LOGOUT)

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, name: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    clearAuthCache();
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
        isBanned,
        userName,
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
