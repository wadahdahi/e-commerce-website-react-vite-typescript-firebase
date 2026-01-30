interface ArrowButtonProps {
  onClick?: () => void;
  isExpanded?: boolean;
  className?: string;
  label?: string;
}

export default function ArrowButton({
  onClick,
  isExpanded = false,
  className = "",
  label = "Toggle Menu",
}: ArrowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`justify-center items-center w-[46px] h-[46px] rounded-full border-2 border-dashed transition-all duration-300
        ${
          isExpanded
            ? "bg-transparent text-brown-60 border-brown-60 dark:brown-60 dark:brown-60"
            : "bg-transparent border-brown-60/20 text-brown-60 dark:brown-60 dark:border-brown-60/10"
        } ${className}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isExpanded ? "rotate-90" : "rotate-0"
        }`}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
}
