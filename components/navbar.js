import { PROFILE_TAB } from "@/config/headerOption";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CustomDropdown from "./dropdown";
import { Transition } from "@headlessui/react";
import { FaSistrix } from "react-icons/fa6";
import logo from "../assets/logo.png";

const Navbar = ({ showDrawer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="p-2 block lg:hidden" onClick={() => showDrawer()}>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  className="h-10 w-10 cursor-pointer"
                  src={logo}
                  alt="Workflow"
                />
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <div className="px-3">
                <CustomDropdown
                  items={PROFILE_TAB}
                  div={
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <img
                        className="w-10 h-10 rounded-full cursor-pointer"
                        src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                        alt="Rounded avatar"
                      ></img>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-black inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {() => (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-xl">
              {HEADER_TAB?.map((item, index) => (
                <Link
                  key={index}
                  href={item?.link}
                  className="bg-primary text-white relative flex  justify-center px-3 py-2 rounded-md text-base font-medium"
                >
                  {item?.name}
                </Link>
              ))}

              <form className="mt-2 pb-4 flex justify-center">
                <div className="relative w-3/4">
                  <label className="sr-only" htmlFor="email">
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    className="w-full rounded-full border-2 bg-gray p-3 pe-32 text-sm font-medium"
                    id="email"
                    type="email"
                    placeholder="search"
                  />

                  <button className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition">
                    <FaSistrix />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

export default Navbar;
