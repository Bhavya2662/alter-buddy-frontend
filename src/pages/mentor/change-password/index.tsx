import React, { useEffect, useState } from "react";
import { MentorLayout } from "../../../layout";
import {
  useGetAllCategoryQuery,
  useMentorProfileQuery,
  useUpdateMentorProfileMutation,
} from "../../../redux/rtk-api";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

export const MentorPasswordPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [specialists, setSpecialists] = useState<string[]>([]);
  const [updateMentorProfile] = useUpdateMentorProfileMutation();
  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false); // ✅ Controls edit state

  const [data, setData] = useState<any>({
    auth: { username: "", password: "" },
  });

  const handleSubmit = async (values: any) => {
    const finalData = {
      auth: {
        username: values.username,
        password: values.password,
      },
    };

    try {
      await updateMentorProfile({
        id: profile?.data?._id,
        body: finalData,
      }).unwrap();
      // navigate("/mentor/dashboard");
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to update profile. Please try again."
      );
    }
  };

  const {
    data: profile,
    isError: isProfileError,
    error: profileError,
    isLoading: isProfileLoading,
  } = useMentorProfileQuery();

  useEffect(() => {
    if (isProfileError) {
      toast.error(
        (profileError as any)?.data?.message || "Failed to fetch profile"
      );
    } else if (profile?.data) {
      setData({ ...profile.data });
      setSpecialists(profile.data.specialists || []);
      setLanguages(profile.data.languages || []);
    }
  }, [profile, isProfileError, profileError]);

  return (
    <MentorLayout loading={isProfileLoading}>
      <div className="p-8 max-w-full mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Change Username/Password</h1>
          {!isEditable && (
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-full shadow"
              onClick={() => setIsEditable(true)}
            >
              Edit Details
            </button>
          )}
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            username: data?.auth?.username,
            password: data?.auth?.password,
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-4">
                <div className="w-full">
                  <label htmlFor="username" className="block mb-1 font-medium">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full border p-2 rounded"
                    value={values.username}
                    onChange={handleChange}
                    disabled={!isEditable}
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="password" className="block mb-1 font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    type="text"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    value={values.password}
                    onChange={handleChange}
                    disabled={!isEditable}
                  />
                </div>
              </div>

              {isEditable && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full"
                  >
                    Save Details
                  </button>
                </div>
              )}
            </form>
          )}
        </Formik>
      </div>
    </MentorLayout>
  );
};
