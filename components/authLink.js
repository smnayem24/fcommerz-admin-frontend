import Link from "next/link";
import React from "react";

const AuthLink = ({ btnName }) => {
  return (
    <Link
      href={`${btnName === "Register" ? "/register" : "/"}`}
      className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400 "
    >
      {btnName}
    </Link>
  );
};

export default AuthLink;
