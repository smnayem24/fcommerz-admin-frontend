import Link from "next/link";
import React from "react";

const CommonLink = ({ text, icon, href }) => {
  return (
    <Link
      href={href}
      className={`${
        icon && "flex mt-10"
      } w-40 text-sm font-semibold text-gray-700 hover:text-black focus:text-blue-700`}
    >
      {icon && (
        <svg
          className="fill-current mr-2 text-primary w-4"
          viewBox="0 0 448 512"
        >
          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
        </svg>
      )}
      {text}
    </Link>
  );
};

export default CommonLink;
