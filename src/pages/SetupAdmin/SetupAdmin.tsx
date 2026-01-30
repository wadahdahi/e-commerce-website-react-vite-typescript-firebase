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

const SetupAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSetup = async () => {
    setError("");
    setLoading(true);

    try {
      // CREATE ADMIN USER
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // UPDATE PROFILE
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // STORE WITH ADMIN ROLE
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: name,
        email: email,
        role: "admin", // ADMIN ROLE
        createdAt: new Date().toISOString(),
      });

      alert(
        "✅ Admin account created successfully! You can now delete this page from your code.",
      );
      navigate("/overview");
    } catch (err: any) {
      console.error("Setup error:", err);
      setError(err.message || "فشل إنشاء حساب الأدمن. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSetup = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // CHECK IF USER ALREADY EXISTS
      const userDoc = await getDoc(doc(db, "users", result.user.uid));

      if (!userDoc.exists()) {
        // NEW USER - CREATE WITH ADMIN ROLE
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          name: result.user.displayName || "Admin",
          email: result.user.email,
          role: "admin", // ADMIN ROLE!
          createdAt: new Date().toISOString(),
        });
      } else {
        // USER EXISTS - UPDATE ROLE TO ADMIN
        await setDoc(
          doc(db, "users", result.user.uid),
          {
            role: "admin",
          },
          { merge: true },
        );
      }

      alert(
        "✅ Admin account created successfully! You can now delete this page from your code.",
      );
      navigate("/overview");
    } catch (err: any) {
      console.error("Google Setup error:", err);
      setError(
        err.message ||
          "فشل إنشاء حساب الأدمن عبر Google. يرجى المحاولة مرة أخرى.",
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brown-80/20 to-brown-60/10">
      <div className="w-full max-w-lg">
        {/* WARNING BANNER */}
        <div className="mb-6 p-4 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-lg">
          <h3 className="font-bold text-yellow-600 dark:text-yellow-400 mb-2 flex items-center gap-2">
            ⚠️ صفحة مؤقتة
          </h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            هذه الصفحة مخصصة لإنشاء حساب الأدمن الأول فقط. احذفها من الكود بعد
            الاستخدام لأسباب أمنية.
          </p>
        </div>

        <AuthForm
          title="🔐 Setup Admin Account"
          submitText={loading ? "جاري الإنشاء..." : "Create Admin"}
          onSubmit={handleEmailSetup}
        >
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-600 dark:text-blue-400 text-sm">
            💡 استخدم بريدك الإلكتروني الحقيقي وكلمة مرور قوية
          </div>

          {/* GOOGLE SIGN IN - EASIEST WAY */}
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <GoogleSignInButton
              onClick={handleGoogleSetup}
              loading={googleLoading}
              text="Create Admin with Google"
            />
          </div>

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
            label="Admin Name"
            type="text"
            placeholder="Your Name"
            name="name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            label="Admin Email"
            type="email"
            placeholder="admin@styleloom.com"
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

export default SetupAdmin;
