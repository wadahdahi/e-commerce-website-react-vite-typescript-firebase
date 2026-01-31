interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  position?: string;
  dimentions?: string;
  extraComponent?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  imageSrc,
  extraComponent,
}) => {
  return (
    <div
      className="relative bg-none xl:bg-no-repeat xl:bg-right xl:bg-contain
                    border-b-2 border-dashed border-dark-15 overflow-hidden"
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="section background"
          className="absolute right-0 top-0 hidden lg:block lg:w-[316px]"
        />
      )}

      <div className="py-[30px] px-[20px] lg:pl-[60px] lg:pr-[250px] lg:py-[60px] 2xl:pl-[80px] 2xl:pr-[300px] 2xl:py-[80px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 lg:mb-6 2xl:mb-[30px]">
          <h2 className="font-roboto font-medium uppercase leading-none text-[28px] lg:text-[38px] 2xl:text-[48px]">
            {title}
          </h2>
          {extraComponent && <div>{extraComponent}</div>}
        </div>
        {subtitle && (
          <p className="font-roboto text-gray-40 leading-[150%] text-[14px] lg:text-[18px]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
