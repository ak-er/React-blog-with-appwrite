import { useEffect, useState } from "react";
import { Logo, Input, AlertCollapse } from "../index";
import { useForm, SubmitHandler } from "react-hook-form";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login as authLogin,
  setAlertOpen,
  setAlertMessage,
} from "../../features/index";
import { RootState } from "../../../store/store";

interface FormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const error = useSelector((state: RootState) => state.alert.alertMessage);
  const { register, handleSubmit } = useForm<FormData>();
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setAlertOpen({ status: false }));
  }, [dispatch]);

  const formSubmit: SubmitHandler<FormData> = async (data) => {
    setProcessing(true);
    dispatch(setAlertMessage(""));
    try {
      const session = await authService.login(data);
      if (session) {
        const user = await authService.getUser();
        if (user) dispatch(authLogin(user));
        navigate("/");
      } else {
        dispatch(setAlertMessage("Invalid credentials"));
        dispatch(setAlertOpen({ status: true }));
      }
    } catch (e) {
      if (e instanceof Error) {
        dispatch(setAlertMessage(e.message));
        dispatch(setAlertOpen({ status: true }));
      }
    }
    setProcessing(false);
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
            <Input
              {...register("email", {
                required: true,
                validate: {
                  matchPatttern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value,
                    ) || "Invalid email",
                },
              })}
              type="email"
              label="Email address"
              labelClass="block text-sm font-medium leading-6 text-gray-900"
              className="block px-2 mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter your email address"
              autoComplete="email"
            />
            <Input
              {...register("password")}
              type="password"
              label="Password"
              labelClass="block text-sm font-medium leading-6 text-gray-900"
              className="block px-2 mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {processing ? "Processing..." : "Sign in"}
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
