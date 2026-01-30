interface ContactInfoCardProps {
  iconBg: string;
  iconMain: string;
  title: string;
  content: string;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  iconBg,
  iconMain,
  title,
  content,
}) => {
  return (
    <div
      className="
        relative z-10 overflow-hidden
        flex flex-col items-center
        p-[30px]
        gap-6 lg:gap-10 2xl:gap-[50px]
      "
    >
      <img
        src={iconBg}
        alt={`${title}-bg`}
        className="
          absolute top-0 right-[-14px]
          w-[120px] 2xl:w-[200px]
        "
      />

      <img src={iconMain} alt={title} className="w-[76px] 2xl:w-[94px]" />

      <div
        className="
          w-full
          flex flex-col items-center
          gap-[10px] lg:gap-3 2xl:gap-4
        "
      >
        <span
          className="
            text-center
            font-roboto font-medium
            text-[18px] md:text-xl 2xl:text-2xl
            dark:text-white
          "
        >
          {title}
        </span>

        <a
          href=""
          className="
            group relative w-full
            p-[14px_20px] 2xl:p-[18px_24px]
            rounded-lg 2xl:rounded-xl
            text-center
            bg-[var(--color-dark-12)]
            text-gray-50
            border-2 border-dashed border-dark-15 rounded-lg lg:rounded-xl
            hover:bg-[var(--color-brown-60)]
            hover:dark:text-white
            transition-colors duration-300
          "
        >
          {/* Top Left */}
          <div
            className="
              absolute top-0 left-0
              w-4 h-4
              border-t border-l
              rounded-tl-lg 2xl:rounded-tl-xl
              border-[var(--color-brown-60)]
              group-hover:border-white
              transition-colors duration-300
            "
          />

          {/* Top Right */}
          <div
            className="
              absolute top-0 right-0
              w-4 h-4
              border-t border-r
              rounded-tr-lg 2xl:rounded-tr-xl
              border-[var(--color-brown-60)]
              group-hover:border-white
              transition-colors duration-300
            "
          />

          {/* Bottom Left */}
          <div
            className="
              absolute bottom-0 left-0
              w-4 h-4
              border-b border-l
              rounded-bl-lg 2xl:rounded-bl-xl
              border-[var(--color-brown-60)]
              group-hover:border-white
              transition-colors duration-300
            "
          />

          {/* Bottom Right */}
          <div
            className="
              absolute bottom-0 right-0
              w-4 h-4
              border-b border-r
              rounded-br-lg 2xl:rounded-br-xl
              border-[var(--color-brown-60)]
              group-hover:border-white
              transition-colors duration-300
            "
          />

          <span className="font-roboto text-[14px] 2xl:text-[18px]">
            {content}
          </span>
        </a>
      </div>
    </div>
  );
};

export default ContactInfoCard;
