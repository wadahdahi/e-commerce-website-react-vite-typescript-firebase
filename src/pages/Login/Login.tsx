import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/Firebase";
import AuthForm from "@/components/common/AuthForm/AuthForm";
import InputField from "@/components/common/InputField/InputField";
import { GoogleSignInButton } from "@/components/common/GoogleSignInButton/GoogleSignInButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // SIGN IN
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // WAIT FOR ROLE TO BE FETCHED FROM FIRESTORE
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role || "user";

        // REDIRECT BASED ON ROLE
        if (userRole === "admin") {
          navigate("/overview");
        } else {
          navigate("/");
        }
      } else {
        // NO USER DOC IN FIRESTORE - REDIRECT TO HOME
        navigate("/");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // CHECK IF USER DOC EXISTS
      const userDoc = await getDoc(doc(db, "users", result.user.uid));

      if (!userDoc.exists()) {
        // NEW USER - CREATE DOC WITH "user" ROLE
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          name: result.user.displayName || "Google User",
          email: result.user.email,
          role: "user",
          createdAt: new Date().toISOString(),
        });
        navigate("/");
      } else {
        // EXISTING USER - CHECK ROLE
        const userData = userDoc.data();
        const userRole = userData.role || "user";

        if (userRole === "admin") {
          navigate("/overview");
        } else {
          navigate("/");
        }
      }
    } catch (err: any) {
      console.error("Google Sign-in error:", err);
      setError(
        err.message || "فشل تسجيل الدخول عبر Google. يرجى المحاولة مرة أخرى.",
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full">
        <AuthForm
          title="Welcome Back"
          submitText={loading ? "جاري تسجيل الدخول..." : "Login"}
          onSubmit={handleEmailLogin}
        >
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* GOOGLE SIGN IN */}
          <GoogleSignInButton
            onClick={handleGoogleSignIn}
            loading={googleLoading}
            text="Sign in with Google"
          />

          {/* DIVIDER */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-gray-300 dark:border-dark-15"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-brown-80 dark:bg-dark-12 text-gray-500 dark:text-gray-400">
                OR
              </span>
            </div>
          </div>

          <InputField
            label="Email Address"
            type="email"
            placeholder="email@example.com"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            name="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </AuthForm>
      </div>
    </div>
  );
};

export default Login;
