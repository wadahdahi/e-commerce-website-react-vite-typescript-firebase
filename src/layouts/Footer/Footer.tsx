import CategoriesBarSection from "@/components/common/sections/CategoriesBarSection/CategoriesBarSection";
import { IMAGES } from "@/constants/images";
import { useIsDark } from "@/constants/useIsDark";
import { Link } from "react-router-dom";

const socialIcons = ["instagram", "website", "twitter", "behance"];
const homeLinks = ["Why Us", "About Us", "Testimonials", "FAQ's"];
const productLinks = ["Menswear", "Womenswear", "Kidswear"];
const categories = [
  "Tank Top",
  "T-Shirt",
  "Long-Sleeve T-Shirt",
  "Raglan Sleeve Shirt",
  "Crop Top",
  "V-Neck Shirt",
  "Muscle Shirt",
];
export default function Footer() {
  const isDark = useIsDark();
  return (
    <footer
      className="
        border-y border-dashed border-dark-15
        lg:border-y-[1.5px]
        2xl:border-y-2
      "
    >
      <CategoriesBarSection categories={categories} speed={25} />
      <section className="flex flex-col px-4 sm:px-12 sm:pb-12 lg:px-20 2xl:px-40.5">
        <div
          className="
          py-[50px] lg:py-20
          flex flex-col gap-[30px]
          lg:flex-row lg:justify-between lg:items-center
        "
        >
          <img
            src={isDark ? IMAGES.LOGO_SVG.FOR_DARK : IMAGES.LOGO_SVG.FOR_LIGHT}
            alt="logo"
            className="lg:w-[630px] 2xl:w-[788px]"
          />

          <div className="flex gap-4 2xl:gap-5">
            {socialIcons.map((icon) => (
              <div
                key={icon}
                className="
                flex items-center justify-center
                w-12 h-12
                lg:w-14 lg:h-14
                2xl:w-[66px] 2xl:h-[66px]
                rounded-lg 2xl:rounded-xl
                bg-brown-80
              "
              >
                <img src={`/assets/icons/footer/${icon}.svg`} alt={icon} />
              </div>
            ))}
          </div>
        </div>

        <div
          className="
          py-10 lg:py-[60px] 2xl:py-20
          flex flex-col gap-[30px]
          lg:flex-row lg:justify-between lg:items-center
          lg:gap-[50px] 2xl:gap-20
          border-y border-dashed border-dark-15
          lg:border-y-[1.5px]
          2xl:border-y-2
        "
        >
          <div className="flex flex-col gap-5 lg:gap-6 2xl:gap-[30px]">
            <h3 className="font-medium dark:text-white lg:text-lg 2xl:text-[22px]">
              Home
            </h3>

            <ul className="flex items-center gap-2.5 lg:gap-3 2xl:gap-4">
              {homeLinks.map((item, index) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Link
                    to=""
                    className="
                    font-mono text-sm lg:text-base 2xl:text-xl
                    leading-relaxed text-gray-40
                  "
                  >
                    {item}
                  </Link>
                  {index < homeLinks.length - 1 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-15" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:gap-6 2xl:gap-[30px]">
            <h3 className="font-medium dark:text-white lg:text-lg 2xl:text-[22px]">
              Products
            </h3>

            <ul className="flex items-center gap-2.5 lg:gap-3 2xl:gap-4">
              {productLinks.map((item, index) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Link
                    to=""
                    className="
                    font-mono text-sm lg:text-base 2xl:text-xl
                    leading-relaxed text-gray-40
                  "
                  >
                    {item}
                  </Link>
                  {index < productLinks.length - 1 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-15" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:gap-6 2xl:gap-[30px]">
            <h3 className="font-medium dark:text-white lg:text-lg 2xl:text-[22px]">
              Subscribe to Newsletter
            </h3>

            <form>
              <div
                className="
                flex items-center justify-between
                py-[14px] px-5
                2xl:py-4.5 2xl:px-6
                rounded-[7px] dark:bg-[#1A1A1A]
              "
              >
                <input
                  type="email"
                  placeholder="Your Email"
                  className="
                  font-mono text-sm lg:text-base 2xl:text-xl
                  leading-relaxed text-gray-40
                  bg-transparent focus:outline-none focus:text-white
                "
                />
                <button type="submit">
                  <img
                    src="/assets/icons/general/arrow.svg"
                    alt="arrow"
                    className="w-5 2xl:w-6"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          className="
          py-[30px] lg:py-10 2xl:py-[50px]
          flex flex-col gap-5
          md:flex-row md:justify-between md:items-center
        "
        >
          <p
            className="
            font-mono text-sm lg:text-base 2xl:text-xl
            leading-relaxed text-gray-40
          "
          >
            © 2026 StyleLoom. All rights reserved. Focal X Academy v9, Team-X3
          </p>

          <div className="flex items-center gap-4">
            <Link
              to=""
              className="
              pr-2.5 border-r border-dark-15
              font-mono text-sm lg:text-base 2xl:text-xl
              leading-relaxed text-gray-40
            "
            >
              Terms & Conditions
            </Link>
            <Link
              to=""
              className="
              pl-2.5
              font-mono text-sm lg:text-base 2xl:text-xl
              leading-relaxed text-gray-40
            "
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}
