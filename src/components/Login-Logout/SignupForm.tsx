import { Logo, Input, AlertCollapse } from "../index";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { useForm, SubmitHandler } from "react-hook-form";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { login, setAlertMessage, setAlertOpen } from "../../features/index";

type InputFieldName = "username" | "email" | "password";
interface FormData {
  username: string;
  email: string;
  password: string;
}

interface InputField {
  type: string;
  label: string;
  name: InputFieldName;
  placeholder: string;
  autoComplete: string;
}

const formInputFields: InputField[] = [
  {
    type: "text",
    label: "Username",
    name: "username",
    placeholder: "Username",
    autoComplete: "username",
  },
  {
    type: "email",
    label: "Email address",
    name: "email",
    placeholder: "Enter your email address",
    autoComplete: "email",
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    placeholder: "Password",
    autoComplete: "current-password",
  },
  {
    type: "password",
    label: "Confirm Password",
    name: "password",
    placeholder: "Confirm password",
    autoComplete: "confirm-password",
  },
];

export const SignupForm = () => {
  const error = useSelector((state: RootState) => state.alert.alertMessage);
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(setAlertMessage(""));
    try {
      const userRegister = await authService.register(data);
      if (!userRegister) {
        dispatch(setAlertMessage("User not registered"));
        dispatch(setAlertOpen({ status: true }));
        throw new Error("User not registered");
      }
      const user = await authService.getUser();
      if (!user) {
        dispatch(setAlertMessage("User not found"));
        dispatch(setAlertOpen({ status: true }));
        throw new Error("User not found");
      }
      dispatch(login(user));
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setAlertMessage(error.message));
        dispatch(setAlertOpen({ status: true }));
      }
    }
  };
  return (
    <>
      {error && (
        <AlertCollapse severity="error" color="error">
          {error}
        </AlertCollapse>
      )}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo width="60px" />
          <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
            {formInputFields &&
              formInputFields.map((inputField) => (
                <Input
                  key={inputField.name}
                  {...register(inputField.name, {
                    required: true,
                  })}
                  type={inputField.type}
                  label={inputField.label}
                  labelClass="block text-sm font-medium leading-6 text-gray-900"
                  className="block px-2 mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={inputField.placeholder}
                  autoComplete={inputField.autoComplete}
                />
              ))}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Signup
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
