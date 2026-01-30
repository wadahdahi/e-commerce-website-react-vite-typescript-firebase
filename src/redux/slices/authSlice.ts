import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { auth } from "@/config/Firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth";

interface AuthState {
  user: User | null; // Firebase User object
  isAuthenticated: boolean;
  isAdmin: boolean; // For now we can assume any logged in user is admin, or check specific email
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  status: "idle",
  error: null,
};

// Async Thunks
export const loginAdmin = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Serialize the user object partially to avoid non-serializable errors in Redux if needed
      // For now, Firebase User object is complex, usually we just store essential info.
      // But redux-toolkit often warns about non-serializable data. 
      // Let's store strict user info if issues arise, but for now pass the user.
      // Note: passing complex objects is generally discouraged.
      return { 
          uid: userCredential.user.uid, 
          email: userCredential.user.email 
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to login");
    }
  }
);

export const logoutAdmin = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to logout");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.isAdmin = !!action.payload; // Simplified logic
    },
    setLoading(state, action: PayloadAction<boolean>) {
       state.status = action.payload ? 'loading' : 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload as any;
        state.isAuthenticated = true;
        state.isAdmin = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
      });
  },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
