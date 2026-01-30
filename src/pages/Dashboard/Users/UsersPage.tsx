import { useState, useEffect } from "react";
import { db } from "@/config/Firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getSecondaryAuth } from "@/utils/firebaseAdminManual";
import { ICONS, UIcon } from "@/constants/icons";
import { StatCard } from "@/components/dashboard/Overview/StatCard";

interface UserData {
  id: string;
  name?: string;
  displayName?: string;
  email: string;
  role: string;
  createdAt?: string;
  isBanned?: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // FETCH USERS
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("role", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserData[];
      setUsers(usersList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // MANUAL USER ADDITION
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.email || !newUser.password || !newUser.name)
      return alert("Fill all fields");

    try {
      const secondaryAuth = getSecondaryAuth();
      // CREATE IN AUTH (SECONDARY INSTANCE)
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        newUser.email,
        newUser.password,
      );

      // CREATE IN FIRESTORE
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isBanned: false,
        createdAt: new Date().toISOString(),
      });

      // SIGN OUT FROM SECONDARY TO KEEP CLEAN
      await signOut(secondaryAuth);

      alert("User created successfully!");
      setIsAdding(false);
      setNewUser({ name: "", email: "", password: "", role: "user" });
    } catch (error: any) {
      console.error("Error adding user:", error);
      alert(error.message);
    }
  };

  // TOGGLE BAN
  const toggleBan = async (userId: string, currentStatus: boolean) => {
    if (
      !window.confirm(
        `Are you sure you want to ${currentStatus ? "unban" : "ban"} this user?`,
      )
    )
      return;
    try {
      await updateDoc(doc(db, "users", userId), { isBanned: !currentStatus });
    } catch (error) {
      console.error("Error toggling ban:", error);
    }
  };

  // DELETE USER
  const deleteUser = async (userId: string) => {
    if (
      !window.confirm(
        "CRITICAL: Deleting from Firestore will remove all user data and block access. Proceed?",
      )
    )
      return;
    try {
      await deleteDoc(doc(db, "users", userId));
      alert("User removed from database.");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const sendEmail = (email: string) => {
    window.location.href = `mailto:${email}?subject=Message from StyleLoom Admin`;
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    banned: users.filter((u) => u.isBanned).length,
    enabled: users.length - users.filter((u) => u.isBanned).length,
  };

  if (loading)
    return <div className="p-10 font-mono text-center">Loading Users...</div>;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center bg-white dark:bg-dark-15 p-6 rounded-2xl border-2 border-dashed border-dark-15">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold font-roboto tracking-tight text-dark-12 dark:text-white border-l-4 border-brown-80 pl-4">
              Users Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-mono ml-5">
              Admin controls for community management.
            </p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-6 py-3 bg-brown-60 text-white rounded-xl font-bold hover:bg-brown-80 transition-all flex items-center gap-2"
          >
            <UIcon
              icon={ICONS.ACTIONS.ADD}
              className="w-5 h-5 brightness-0 invert"
            />
            {isAdding ? "Close Form" : "Add New User"}
          </button>
        </div>
      </div>

      {/* ADD USER FORM */}
      {isAdding && (
        <form
          onSubmit={handleAddUser}
          className="bg-white dark:bg-dark-12 p-8 rounded-2xl border-2 border-dashed border-brown-60/20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-top duration-300"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="px-4 py-2 border dark:bg-dark-15 dark:border-white/10 dark:text-white rounded-lg outline-none focus:border-brown-60"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="px-4 py-2 border dark:bg-dark-15 dark:border-white/10 dark:text-white rounded-lg outline-none focus:border-brown-60"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="px-4 py-2 border dark:bg-dark-15 dark:border-white/10 dark:text-white rounded-lg outline-none focus:border-brown-60"
          />
          <div className="flex gap-2">
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="flex-1 px-4 py-2 border dark:bg-dark-15 dark:border-white/10 dark:text-white rounded-lg outline-none focus:border-brown-60"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="px-4 bg-green-600 text-white rounded-lg font-bold"
            >
              Create
            </button>
          </div>
        </form>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Accounts"
          value={stats.total}
          icon={ICONS.NAV.ACCOUNT}
          trend="System"
        />
        <StatCard
          label="Account Enabled"
          value={stats.enabled}
          icon={ICONS.NAV.HOME}
          trend="Active"
        />
        <StatCard
          label="Account Banned"
          value={stats.banned}
          icon={ICONS.NAV.CONTACT}
          trend="Security"
        />
        <StatCard
          label="Admin Staff"
          value={stats.admins}
          icon={ICONS.NAV.OVERVIEW}
          trend="Privileged"
        />
      </div>

      {/* SEARCH BAR */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Filter users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-white dark:bg-dark-15 rounded-xl border border-dashed border-dark-15 dark:text-white font-mono text-sm focus:border-brown-60 outline-none transition-all"
        />
      </div>

      {/* USERS TABLE */}
      <div className="bg-white dark:bg-dark-15 rounded-2xl border-2 border-dashed border-dark-15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-sm">
            <thead className="bg-gray-50 dark:bg-dark-10 border-b border-dashed border-dark-15">
              <tr>
                <th className="px-6 py-4 font-bold text-dark-10 dark:text-white/60 uppercase">
                  User Identity
                </th>
                <th className="px-6 py-4 font-bold text-dark-10 dark:text-white/60 uppercase">
                  Privilege
                </th>
                <th className="px-6 py-4 font-bold text-dark-10 dark:text-white/60 uppercase">
                  Account Access
                </th>
                <th className="px-6 py-4 font-bold text-dark-10 dark:text-white/60 uppercase text-right">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-dark-15">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-dark-12 dark:text-white uppercase">
                        {user.name || user.displayName || "Unknown"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {user.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.isBanned ? (
                      <span className="text-red-500 font-bold uppercase text-xs flex items-center gap-1">
                        ⛔ Banned
                      </span>
                    ) : (
                      <span className="text-green-500 font-bold uppercase text-xs flex items-center gap-1">
                        ✅ Enabled
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 transition-all">
                      <button
                        onClick={() => sendEmail(user.email)}
                        title="Email User"
                        className="p-2 bg-blue-100/80 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 transition-all font-bold text-[10px]"
                      >
                        MAIL
                      </button>
                      {user.role !== "admin" && (
                        <>
                          <button
                            onClick={() => toggleBan(user.id, !!user.isBanned)}
                            title={
                              user.isBanned ? "Pardon User" : "Restrict User"
                            }
                            className={`p-2 rounded-lg transition-all font-bold text-[10px] ${
                              user.isBanned
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                            }`}
                          >
                            {user.isBanned ? "ENABLE" : "BAN"}
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            title="Purge User"
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all font-bold text-[10px]"
                          >
                            DELETE
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
