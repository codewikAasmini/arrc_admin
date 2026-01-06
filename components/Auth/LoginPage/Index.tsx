"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import ShowToast from "@/components/Common/ShowToast";

import { FiMail } from "react-icons/fi";
import {
  MdOutlineLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { onLoginSuccess } from "@/redux/auth/authSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 py-10 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <div className="w-full max-w-lg">
        <div className="relative overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />

          <div className="p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10">
            <div className="flex flex-col items-center text-center space-y-8">
              {/* Logo */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full blur-xl opacity-30" />
                <span className="flex overflow-hidden rounded-full relative h-24 w-24 shadow-lg ring-4 ring-white/50">
                  <img
                    src="/images/logo.png"
                    alt="ARRC Logo"
                    className="h-full w-full object-cover"
                  />
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900">
                  Welcome to ARRC
                </h1>
                <p className="text-slate-500 font-medium">
                  Admin sign in
                </p>
              </div>

              {/* Login Form */}
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const ADMIN_EMAIL = "admin@arrc.com";
                    const ADMIN_PASSWORD = "123456";

                    if (
                      values.email === ADMIN_EMAIL &&
                      values.password === ADMIN_PASSWORD
                    ) {
                      ShowToast("Login successful", "success");

                      dispatch(
                        onLoginSuccess({
                          data: {
                            email: ADMIN_EMAIL,
                            role: "admin",
                          },
                        })
                      );

                      router.push("/dashboard");
                    } else {
                      ShowToast("Invalid credentials", "error");
                    }
                  } catch {
                    ShowToast("Something went wrong", "error");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  isSubmitting,
                }) => (
                  <Form className="space-y-4 w-full">
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      leftIcon={<FiMail size={20} />}
                    />
                    {errors.email && touched.email && (
                      <p className="text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}

                    <div className="relative">
                      <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        leftIcon={<MdOutlineLock size={20} />}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-4 top-[34px] text-slate-500 hover:text-slate-700"
                      >
                        {showPassword ? (
                          <MdVisibilityOff size={20} />
                        ) : (
                          <MdVisibility size={20} />
                        )}
                      </button>
                    </div>

                    <Button
                      variant="black"
                      size="lg"
                      rounded="full"
                      className="w-full"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Signing in..."
                        : "Sign in"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
