import { BsArchive } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { RiTelegram2Line } from "react-icons/ri";

import { BsRCircle } from "react-icons/bs";
import { MainButton } from "@/components/common/MainButton/MainButton";
import { Link } from "react-router-dom";

const NotFound = () => {
  const socialIcons = ["instagram", "website", "twitter", "behance"];
  return (
    <div className="flex flex-col w-full h-screen justify-between bg-brown-80/20 dark:bg-dark-12 p-6">
      <p className="text-brown-50 text-xl">404</p>
      {/* Main Content */}
      <div className="flex flex-col items-center justify-between gap-6 md:gap-12 p-12">
        {/* Text Section */}
        <div className="flex flex-col gap-6 w-full">
          <div className="max-w-md space-y-6">
            <h1 className="text-6xl sm:text-8xl md:text-5xl text-brown-50">
              Oops!
            </h1>
            <h3 className="text-2xl sm:text-3xl md:text-4xl text-brown-50">
              Something Went Wrong
            </h3>
            <p className="font-semibold text-lg sm:text-xl text-brown-50">
              Don't worry, our team is here to help
            </p>
            {/* Features List */}
            <div className="space-y-3">
              <Link to={"/"} className="flex items-center gap-3">
                <BsArchive className="text-brown-50 text-xl" />
                <p className="text-brown-50">Question and answers</p>
              </Link>
              <Link to={"/"} className="flex items-center gap-3">
                <IoIosPeople className="text-brown-50 text-xl" />
                <p className="text-brown-50">Community forum</p>
              </Link>
              <Link to={"/"} className="flex items-center gap-3">
                <RiTelegram2Line className="text-brown-50 text-xl" />
                <p className="text-brown-50">Send support request</p>
              </Link>
            </div>
            {/* CTA Button */}
            <MainButton
              to={"/"}
              className="bg-brown-40 dark:bg-brown-40 text-white"
            >
              Back to Home
            </MainButton>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4 2xl:gap-5">
              {socialIcons.map((icon) => (
                <div
                  key={icon}
                  className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 2xl:w-[66px] 2xl:h-[66px] rounded-lg 2xl:rounded-xl bg-brown-70"
                >
                  <img
                    src={`/assets/icons/footer/${icon}.svg`}
                    alt={icon}
                    className="w-6 h-6 filter brightness-0 invert"
                  />
                </div>
              ))}
            </div>
            <div className="flex w-fit items-center justify-center gap-2 font-medium text-brown-70 lg:text-lg 2xl:text-[24px]">
              <span className="text-brown-70 ">
                <BsRCircle />
              </span>
              All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
