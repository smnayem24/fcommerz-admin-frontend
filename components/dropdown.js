import { ProfileTabInfo } from "@/config/headerOption";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import { setUser } from "@/reducer/user";

const CustomDropdown = ({ items, div }) => {
  const [isOpen, setIsOpen] = useState(false);
  const transitionRef = useRef(null);

  // Function to close the Transition when clicking outside
  const handleOutsideClick = (event) => {
    if (
      isOpen &&
      transitionRef.current &&
      !transitionRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  // Add a click event listener to the document
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className="text-white relative hover:bg-orange transition duration-500 ease-in-out text-sm font-medium"
        onClick={() => setIsOpen((previous) => !previous)}
        ref={transitionRef}
      >
        {div}
        <div className="absolute top-15 right-0 w-56 mt-2 origin-top-right rounded-md shadow-lg z-10">
          <Transition
            show={isOpen}
            enter="transition ease-out duration-75"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="bg-white rounded-md shadow-xs">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {items?.map((item, index) => (
                  <CustomLink item={item} key={index} />
                ))}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

export default CustomDropdown;

const CustomLink = ({ item }) => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(setUser(null));
    signOut({ callbackUrl: "/" });
  };
  return (
    <>
      {item?.label === "Sign Out" ? (
        <div
          className="block px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
          onClick={() => handleSignOut()}
        >
          {item?.label}
        </div>
      ) : (
        <Link
          href={item?.link}
          rel="noopener noreferrer"
          className="block px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
          role="menuitem"
        >
          {item?.label}
        </Link>
      )}
    </>
  );
};
