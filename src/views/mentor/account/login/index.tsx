import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../../layout";
import { AppButton, TextField } from "../../../../component";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { IMentorAuthProps } from "../../../../interface";
import {
  MentorSignInProps,
  MentorSignInValidationSchema,
} from "../../../../validation";
import { useAppDispatch } from "../../../../redux";
import {
  useLazyMentorProfileQuery,
  useMentorProfileQuery,
  useMentorSignInMutation,
} from "../../../../redux/rtk-api";
import {
  handleError,
  handleMentorAuthentication,
  useLayoutSlice,
} from "../../../../redux/features";
import { getMentorToken, setMentorToken } from "../../../../utils";
import { AlterBuddyLogo } from "../../../../assets/logo";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const MentorLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error } = useLayoutSlice();
  const [
    triggerGetMentorProfile,
    {
      data: profile,
      isError: isProfileError,
      error: profileError,
      isLoading: isProfileLoading,
    },
  ] = useLazyMentorProfileQuery();

  const [
    MentorSignIn,
    {
      isError: isMentorError,
      error: mentorError,
      isLoading: isMentorLoading,
      isSuccess: isMentorSuccess,
      data: mentorData,
    },
  ] = useMentorSignInMutation();
  const localStore = getMentorToken();
  const isProfileComplete = (profileData: any): boolean => {
    if (!profileData) return false;

    const { name, contact, auth, image, languages, qualification } =
      profileData;

    return (
      auth?.username &&
      auth?.password &&
      contact?.email &&
      contact?.mobile &&
      contact?.address &&
      name?.firstName &&
      name?.lastName &&
      image &&
      Array.isArray(languages) &&
      languages.length > 0 &&
      qualification &&
      qualification.trim() !== ""
    );
  };

  useEffect(() => {
    if (isMentorError) {
      if ((mentorError as any)?.data) {
        dispatch(handleError((mentorError as any)?.data?.message));
      } else {
        console.log(mentorError);
      }
    }
    if (isMentorSuccess) {
      dispatch(handleError(null));
      setMentorToken(mentorData?.data?.token as string);
      if (localStore) {
        dispatch(
          handleMentorAuthentication({
            token: mentorData?.data.token as string,
          })
        );
      }

      triggerGetMentorProfile(); // ✅ now called only after login
    }
  }, [
    isMentorError,
    mentorError,
    dispatch,
    isMentorSuccess,
    mentorData,
    localStore,
    navigate,
  ]);

  const handleSubmit = async ({ password, username }: IMentorAuthProps) => {
    await MentorSignIn({ username, password });
  };

  const [password, showPassword] = useState<boolean>(false);
  useEffect(() => {
    console.log(isProfileComplete(profile?.data));

    if (profile && isProfileComplete(profile?.data)) {
      navigate("/mentor/dashboard");
    } else if (profile && !isProfileComplete(profile?.data)) {
      navigate("/mentor/settings");
    }
  }, [profile]);

  return (
    <MainLayout hideNav>
      <div className="flex flex-row xl:lg:md:h-screen flex-wrap">
        <div className="flex-1 xl:lg:md:visible invisible xl:flex flex-col justify-center items-center lg:flex  md:hidden sm:hidden h-full">
          <AlterBuddyLogo height={75} />
          <img
            className="w-[50%]"
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-757.jpg?w=1480&t=st=1723200003~exp=1723200603~hmac=10e59051f7613c24a875f75ad53a7fa16481cac4307090ec408f5b12c97bef4c"
            alt=""
          />
        </div>
        <div className="flex-1 flex flex-col justify-center w-full px-5">
          <Formik
            initialValues={MentorSignInProps}
            validationSchema={MentorSignInValidationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              errors,
            }) => (
              <form onSubmit={handleSubmit} className="w-[80%] mx-auto">
                <h6 className="text-2xl font-semibold mb-5">
                  Sign in to{" "}
                  <span className="text-primary-500">your account</span>
                </h6>
                <div className="flex flex-col gap-5 mb-5">
                  {error && (
                    <p className="text-center text-red-500 uppercase text-sm">
                      {error}
                    </p>
                  )}
                  <TextField
                    onChange={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    touched={touched.username}
                    error={errors.username}
                    outlined
                    label="username"
                    placeholder="Enter your username"
                  />
                  <div className="flex relative w-full items-center">
                    <TextField
                      type={!password ? "password" : "text"}
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      touched={touched.password}
                      error={errors.password}
                      outlined
                      placeholder="Enter your password"
                      label="password"
                    />
                    <button
                      className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-600"
                      type="button"
                      onClick={() => showPassword(!password)}
                    >
                      {password ? (
                        <AiOutlineEyeInvisible size={24} />
                      ) : (
                        <AiOutlineEye size={24} />
                      )}
                    </button>
                  </div>
                  <Link to="/mentor/reset-password" className="">
                    Forgot password?
                  </Link>
                  <AppButton type="submit" loading={isMentorLoading} outlined>
                    Continue
                  </AppButton>
                  <AppButton type="button" onClick={() => navigate("/")}>
                    Go back
                  </AppButton>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};
