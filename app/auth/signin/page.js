"use client";
import AuthLink from "@/components/authLink";
import SocialButton from "@/components/socialButton";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "@/forms/login";
import { usePostData } from "@/hooks/usePostData";
import { API_END_POINTS } from "@/config/endPoints";
import { message } from "antd";

const authenticateWithNextAuth = async (userData) => {
  const response = await signIn("credentials", {
    ...userData,
    redirect: false,
  });
  return response;
};

const SignInPage = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [messageApi, contextHolder] = message.useMessage();
  const [userCredentials, setUserCredentials] = useState({
    phone: "",
    password: "",
  });
  const { postData, isLoading } = usePostData({
    endpoint: API_END_POINTS.login,
    headers: {
      "Content-Type": "application/json",
    },
    body: userCredentials,
  });
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const handleLogin = async () => {
    try {
      const response = await postData(userCredentials);
      if (response.isSuccess) {
        await authenticateWithNextAuth(response.data);
        router.refresh();
      } else {
        messageApi.error({
          type: "error",
          content: response.message,
        });
      }
    } catch (error) {
      messageApi.error({
        type: "error",
        content: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <section className="min-h-screen flex items-center justify-center lg:py-[8%] md:py-[13%] py-[35%]">
        <div className="bg-white p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="px-5">
            <h2 className="text-2xl font-bold text-primary">Login</h2>
            <p className="text-sm mt-4 text-primary">
              If you have an account, please login
            </p>
            <div className="mt-6">
              <LoginForm
                onFinish={handleLogin}
                setCredentials={setUserCredentials}
                credentials={userCredentials}
                isLoading={isLoading}
              />
            </div>
            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>
            <SocialButton btnName="Login with Google" />
            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you don&apos;t have an account...</p>
              <AuthLink btnName="Register" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignInPage;
