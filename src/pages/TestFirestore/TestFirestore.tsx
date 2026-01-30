import { useState, useEffect } from "react";
import { auth, db } from "@/config/Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

export default function TestFirestore() {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<any>({
    auth: "Loading...",
    write: "Pending",
    read: "Pending",
    writeError: null,
    readError: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setStatus((prev: any) => ({
        ...prev,
        auth: currentUser
          ? `Logged in as: ${currentUser.email}`
          : "Not Logged In (Please Login first)",
      }));
    });
    return () => unsubscribe();
  }, []);

  const runDiagnostics = async () => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    setStatus((prev: any) => ({
      ...prev,
      write: "Running...",
      read: "Pending",
    }));

    try {
      // TEST 1: WRITING
      console.log("Attempting to write to: users/test_doc");
      await setDoc(doc(db, "users", "test_doc"), {
        test: "This is a test document",
        timestamp: new Date().toISOString(),
        uid: user.uid,
      });
      setStatus((prev: any) => ({
        ...prev,
        write: "SUCCESS ✅",
        writeError: null,
      }));

      // TEST 2: READING
      setStatus((prev: any) => ({ ...prev, read: "Running..." }));
      const docSnap = await getDoc(doc(db, "users", "test_doc"));

      if (docSnap.exists()) {
        setStatus((prev: any) => ({
          ...prev,
          read: "SUCCESS ✅",
          readError: null,
        }));
      } else {
        throw new Error("Document written but not found!");
      }
    } catch (error: any) {
      console.error("Diagnostic Error:", error);
      if (error.code === "permission-denied") {
        setStatus((prev: any) => ({
          ...prev,
          write: prev.write === "Running..." ? "FAILED ❌" : prev.write,
          read: prev.read === "Running..." ? "FAILED ❌" : prev.read,
          writeError:
            "PERMISSION DENIED: Firestore Rules blocked this request.",
        }));
      } else {
        setStatus((prev: any) => ({
          ...prev,
          write: prev.write === "Running..." ? "FAILED ❌" : prev.write,
          read: prev.read === "Running..." ? "FAILED ❌" : prev.read,
          writeError: error.message,
        }));
      }
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto mt-10 border rounded-xl shadow-lg bg-white dark:bg-dark-12">
      <h1 className="text-2xl font-bold mb-6 text-brown-60">
        🛠️ Firestore Diagnostics
      </h1>

      <div className="space-y-4">
        {/* AUTH STATUS */}
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-dark-15">
          <p className="font-bold">Auth Status:</p>
          <p className={user ? "text-green-600" : "text-red-500"}>
            {status.auth}
          </p>
        </div>

        {/* CONTROLS */}
        <button
          onClick={runDiagnostics}
          disabled={!user}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Run Diagnostics
        </button>

        {/* RESULTS */}
        <div className="grid grid-cols-1 gap-4 mt-6">
          {/* WRITE TEST */}
          <div
            className={`p-4 border rounded-lg ${status.write.includes("SUCCESS") ? "bg-green-50 border-green-200" : status.write.includes("FAILED") ? "bg-red-50 border-red-200" : "bg-gray-50"}`}
          >
            <h3 className="font-bold mb-2">Test 1: Write Permission</h3>
            <p className="text-lg">{status.write}</p>
            {status.writeError && (
              <p className="text-red-600 text-sm mt-2 font-mono bg-white p-2 rounded border border-red-100">
                {status.writeError}
              </p>
            )}
          </div>

          {/* READ TEST */}
          <div
            className={`p-4 border rounded-lg ${status.read.includes("SUCCESS") ? "bg-green-50 border-green-200" : status.read.includes("FAILED") ? "bg-red-50 border-red-200" : "bg-gray-50"}`}
          >
            <h3 className="font-bold mb-2">Test 2: Read Permission</h3>
            <p className="text-lg">{status.read}</p>
            {status.readError && (
              <p className="text-red-600 text-sm mt-2 font-mono bg-white p-2 rounded border border-red-100">
                {status.readError}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p>
          This page tries to create a document at <code>/users/test_doc</code>.
        </p>
        <p>
          If it fails with "Permission Denied", your Firestore Security Rules
          are blocking the request.
        </p>
      </div>
    </div>
  );
}
