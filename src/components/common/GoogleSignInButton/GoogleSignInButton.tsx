import { FcGoogle } from "react-icons/fc";

interface GoogleSignInButtonProps {
  onClick: () => void;
  loading?: boolean;
  text?: string;
}

export const GoogleSignInButton = ({
  onClick,
  loading = false,
  text = "Continue with Google",
}: GoogleSignInButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="
        w-full
        flex items-center justify-center gap-3
        px-6 py-3.5 2xl:py-4
        
        bg-white dark:bg-dark-12
        border-2 border-gray-200 dark:border-dark-15
        rounded-lg 2xl:rounded-xl
        
        font-roboto font-medium
        text-[14px] 2xl:text-[16px]
        text-gray-700 dark:text-white
        
        hover:bg-gray-50 dark:hover:bg-dark-15
        hover:border-gray-300 dark:hover:border-brown-60/30
        hover:shadow-md
        
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      <FcGoogle className="w-5 h-5 2xl:w-6 2xl:h-6" />
      <span>{loading ? "جاري التحميل..." : text}</span>
    </button>
  );
};
