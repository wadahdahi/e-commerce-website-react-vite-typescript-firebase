import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/Firebase";
import AuthForm from "@/components/common/AuthForm/AuthForm";
import InputField from "@/components/common/InputField/InputField";
import { GoogleSignInButton } from "@/components/common/GoogleSignInButton/GoogleSignInButton";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSignup = async () => {
    setError("");
    setLoading(true);

    try {
      // CREATE USER
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // UPDATE PROFILE NAME
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // STORE USER ROLE IN FIRESTORE
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: name,
        email: email,
        role: "user", // DEFAULT ROLE FOR SIGNUPS
        createdAt: new Date().toISOString(),
      });

      navigate("/");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // CHECK IF USER ALREADY EXISTS
      const userDoc = await getDoc(doc(db, "users", result.user.uid));

      if (!userDoc.exists()) {
        // NEW USER - CREATE DOC
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          name: result.user.displayName || "Google User",
          email: result.user.email,
          role: "user",
          createdAt: new Date().toISOString(),
        });
      }

      navigate("/");
    } catch (err: any) {
      console.error("Google Signup error:", err);
      setError(
        err.message || "فشل التسجيل عبر Google. يرجى المحاولة مرة أخرى.",
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full">
        <AuthForm
          title="Create Account"
          submitText={loading ? "جاري الإنشاء..." : "Sign Up"}
          onSubmit={handleEmailSignup}
        >
          {error && (
            <div className="p-3 bg-red-500/10 border-2 border-red-500/30 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* GOOGLE SIGN IN */}
          <GoogleSignInButton
            onClick={handleGoogleSignup}
            loading={googleLoading}
            text="Sign up with Google"
          />

          {/* DIVIDER */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-gray-300 dark:border-dark-15"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-brown-80 dark:bg-dark-12 text-gray-500 dark:text-gray-400">
                OR
              </span>
            </div>
          </div>

          <InputField
            label="Full Name"
            type="text"
            placeholder="John Doe"
            name="name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </AuthForm>
      </div>
    </div>
  );
};

export default Signup;
