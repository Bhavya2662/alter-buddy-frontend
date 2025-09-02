import React, { useEffect, useState } from "react";
import { MentorLayout } from "../../../layout";
import {
  useGetAllCategoryQuery,
  useMentorProfileQuery,
  useUpdateMentorProfileMutation,
} from "../../../redux/rtk-api";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { Formik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const indianLanguages = [
  "English (English)",
  "नमस्ते (Hindi)",
  "வணக்கம் (Tamil)",
  "నమస్తే (Telugu)",
  "ನಮಸ್ಕಾರ (Kannada)",
  "નમસ્તે (Gujarati)",
  "নমস্কার (Bengali)",
  "ਸਤ ਸ੍ਰੀ ਅਕਾਲ (Punjabi)",
  "नमस्कार (Marathi)",
  "ഹലോ (Malayalam)",
  "ନମସ୍କାର (Odia)",
  "হেলো (Assamese)",
  "હેલો (Rajasthani)",
  "नमस्कार (Sanskrit)",
  "नमस्कार (Konkani)",
  "ಹಲೋ (Tulu)",
  "ਹੈਲੋ (Dogri)",
  "नमस्कार (Maithili)",
  "नमस्कार (Bhojpuri)",
  "ହେଲୋ (Sambalpuri)",
  "ಹಲೋ (Kodava)",
  "হাই (Meitei)",
  "सॅल्यूट (Kashmiri)",
  "हेलो (Chhattisgarhi)",
  "ஹலோ (Badaga)",
  "नमस्ते (Braj Bhasha)",
  "હેલો (Kutchi)",
  "हेलो (Sindhi)",
  "ஹலோ (Toda)",
  "ഹലോ (Mizo)",
  "हाय (Marwari)",
  "नमस्ते (Magahi)",
  "নমস্কাৰ (Bodo)",
  "ಹಲೋ (Beary)",
  "हेलो (Pahari)",
  "हेलो (Bhili)",
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string().required("Mobile is required"),
  address: Yup.string().required("Address is required"),
  videoLink: Yup.string().required("Video Link is required"),
  description: Yup.string().required("Description is required"),
  qualification: Yup.string().required("Qualification is required"),
  image: Yup.string().required("Image URL is required"),
   maxSlotTime: Yup.number()
    .oneOf([45, 60], "Only 45 or 60 minutes allowed")
    .required("Slot time is required"),
});

export const MentorSettingsPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [specialists, setSpecialists] = useState<string[]>([]);
  const [updateMentorProfile] = useUpdateMentorProfileMutation();
  const navigate = useNavigate();

  const [data, setData] = useState<any>({
    name: {},
    contact: {},
    category: [],
    specialists: [],
    languages: [],
    videoLink: "",
    description: "",
    image: "",
    qualification: "",
    maxSlotTime: 60,
  });

  const handleSubmit = async (values: any) => {
    if (!data.category.length) return toast.error("Category is required");
    if (!languages.length)
      return toast.error("At least one language is required");
    if (!specialists.length)
      return toast.error("At least one specialization is required");

    const finalData = {
      ...values,
      name: { firstName: values.firstName, lastName: values.lastName },
      contact: {
        email: values.email,
        mobile: values.mobile,
        address: values.address,
      },
      category: data.category.map((c) => c._id),
      languages,
      specialists,
      maxSlotTime: values.maxSlotTime,
    };

    try {
      await updateMentorProfile({
        id: profile?.data?._id,
        body: finalData,
      }).unwrap();
      navigate("/mentor/dashboard");
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile.");
    }
  };

  const { data: profile, isLoading: isProfileLoading } =
    useMentorProfileQuery();
  const { data: category } = useGetAllCategoryQuery();

  useEffect(() => {
    if (category?.data) {
      setCategories(
        category.data.map((cat) => ({ value: cat._id, label: cat.title }))
      );
    }
  }, [category]);

  useEffect(() => {
    if (profile?.data) {
      setData({ ...profile.data });
      setSpecialists(profile.data.specialists || []);
      setLanguages(profile.data.languages || []);
    }
  }, [profile]);

  return (
    <MentorLayout loading={isProfileLoading}>
      <div className="p-8 max-w-full mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Update Profile</h1>
          <button
            type="button"
            className="bg-primary-500 text-white px-4 py-2 rounded-full"
            onClick={() =>
              window.open(
                `/user/mentor/details/${profile?.data?._id}`,
                "_blank"
              )
            }
          >
            Preview Profile
          </button>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            firstName: data?.name?.firstName || "",
            lastName: data?.name?.lastName || "",
            email: data?.contact?.email || "",
            mobile: data?.contact?.mobile || "",
            address: data?.contact?.address || "",
            videoLink: data?.videoLink || "",
            description: data?.description || "",
            qualification: data?.qualification || "",
            image: data?.image || "",
            maxSlotTime: data?.maxSlotTime || 60,
            specializationInput: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Existing fields before slot duration (e.g. name, email, image, videoLink, etc.) */}
              {/* First Row */}
              <div className="flex gap-4">
                <div className="w-full">
                  <label htmlFor="image" className="block mb-1 font-medium">
                    Image URL
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="text"
                    placeholder="Image URL"
                    className="w-full border p-2 rounded"
                    value={values.image}
                    onChange={handleChange}
                  />
                  {touched.image && errors.image && (
                    <div className="text-red-500 text-sm">{errors.image as string}</div>
                  )}
                </div>

                <div className="w-full">
                  <label htmlFor="firstName" className="block mb-1 font-medium">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className="w-full border p-2 rounded"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                  {touched.firstName && errors.firstName && (
                    <div className="text-red-500 text-sm">
                      {errors.firstName as string}
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <label htmlFor="lastName" className="block mb-1 font-medium">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="w-full border p-2 rounded"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                  {touched.lastName && errors.lastName && (
                    <div className="text-red-500 text-sm">
                      {errors.lastName as string}
                    </div>
                  )}
                </div>
              </div>

              {/* Second Row */}
              <div className="flex gap-4">
                <div className="w-full">
                  <label htmlFor="email" className="block mb-1 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-sm">{errors.email as string}</div>
                  )}
                </div>

                <div className="w-full">
                  <label htmlFor="mobile" className="block mb-1 font-medium">
                    Mobile
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="text"
                    placeholder="Mobile"
                    className="w-full border p-2 rounded"
                    value={values.mobile}
                    onChange={handleChange}
                  />
                  {touched.mobile && errors.mobile && (
                    <div className="text-red-500 text-sm">{errors.mobile as string}</div>
                  )}
                </div>

                <div className="w-full">
                  <label htmlFor="address" className="block mb-1 font-medium">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Address"
                    className="w-full border p-2 rounded"
                    value={values.address}
                    onChange={handleChange}
                  />
                  {touched.address && errors.address && (
                    <div className="text-red-500 text-sm">{errors.address as string}</div>
                  )}
                </div>
              </div>

              {/* Video Link */}
              <div>
                <label htmlFor="videoLink" className="block mb-1 font-medium">
                  Intro Video Link
                </label>
                <input
                  id="videoLink"
                  type="text"
                  name="videoLink"
                  placeholder="Intro Video Link"
                  className="w-full border p-2 rounded"
                  value={values.videoLink}
                  onChange={handleChange}
                />
                {touched.videoLink && errors.videoLink && (
                  <div className="text-red-500 text-sm">{errors.videoLink as string}</div>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block mb-1 font-medium">
                  Profile Description
                </label>
                <ReactQuill
                  theme="snow"
                  className="bg-white"
                  value={values.description}
                  onChange={(val) => setFieldValue("description", val)}
                />
                {touched.description && errors.description && (
                  <div className="text-red-500 text-sm">
                    {errors.description as string}
                  </div>
                )}
              </div>

              {/* Category and Language */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Categories</label>
                  <Select
                    isMulti
                    options={categories}
                    value={categories.filter((cat) =>
                      data.category.some(
                        (selected) => selected._id === cat.value
                      )
                    )}
                    onChange={(selectedOptions) => {
                      setData((prev) => ({
                        ...prev,
                        category: selectedOptions.map((opt) => ({
                          _id: opt.value,
                          title: opt.label,
                        })),
                      }));
                    }}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Languages</label>
                  <Select
                    isMulti
                    options={indianLanguages.map((l) => ({
                      value: l,
                      label: l,
                    }))}
                    value={languages.map((lang) => ({
                      value: lang,
                      label: lang,
                    }))}
                    onChange={(selectedOptions) =>
                      setLanguages(selectedOptions.map((opt) => opt.value))
                    }
                  />
                </div>
              </div>

              {/* Qualification */}
              <div>
                <label
                  htmlFor="qualification"
                  className="block mb-1 font-medium"
                >
                  Qualification
                </label>
                <input
                  id="qualification"
                  type="text"
                  name="qualification"
                  placeholder="Qualification"
                  className="w-full border p-2 rounded"
                  value={values.qualification}
                  onChange={handleChange}
                />
                {touched.qualification && errors.qualification && (
                  <div className="text-red-500 text-sm">
                    {errors.qualification as string}
                  </div>
                )}
              </div>

              {/* Specialization */}
              <div>
                <label
                  htmlFor="specializationInput"
                  className="block mb-1 font-medium"
                >
                  What You Can Help With?
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    id="specializationInput"
                    type="text"
                    className="flex-1 border p-2 rounded"
                    placeholder="Add specialization"
                    value={values.specializationInput}
                    onChange={(e) =>
                      setFieldValue("specializationInput", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded"
                    onClick={() => {
                      const newSpec = values.specializationInput?.trim();
                      if (newSpec && !specialists.includes(newSpec)) {
                        setSpecialists((prev) => [...prev, newSpec]);
                        setFieldValue("specializationInput", "");
                      }
                    }}
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {specialists.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-200 px-3 py-1 rounded-full"
                    >
                      <span>{spec}</span>
                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={() =>
                          setSpecialists((prev) =>
                            prev.filter((_, idx) => idx !== index)
                          )
                        }
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="maxSlotTime" className="block mb-1 font-medium">
                  Select Allowed Slot Durations (in minutes)
                </label>
                <select
                  id="maxSlotTime"
                  name="maxSlotTime"
                  className="w-full border p-2 rounded"
                  value={values.maxSlotTime}
                  onChange={handleChange}
                >
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
                {touched.maxSlotTime && errors.maxSlotTime && (
                  <div className="text-red-500 text-sm">{errors.maxSlotTime as string}</div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary-500 text-white px-6 py-2 rounded-full"
                >
                  Update Profile
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </MentorLayout>
  );
};
