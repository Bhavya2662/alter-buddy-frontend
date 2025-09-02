import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../../layout";
import {
  useGetAllCategoryQuery,
  useGetAllSlotsQuery,
  useGetMentorsListQuery,
} from "../../../../redux/rtk-api";
import { useAppDispatch } from "../../../../redux";
import { handleError } from "../../../../redux/features";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Field, Label, Select } from "@headlessui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { Text } from "@chakra-ui/react";

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

const budget = ["1-599rs", "600-999rs", "1000-9999rs", "More than 9999rs"];

const excludeTitles = [
  "AUTOMATIC WRITING",
  "PAST LIFE REGRESSION",
  "TAROT READING",
  "AKASHIC RECORDS",
];
export const AllMentorsPage = ({ categoryId = null }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [params] = useSearchParams();
  const target = params.get("target");
  const { data: slots } = useGetAllSlotsQuery();
  const [catFilter2, setCatFilter2] = useState<string>("all");
  const [catFilter, setCatFilter] = useState<string>("all");
  const [langFilter, setLangFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: category,
    isError: isCategoryError,
    error: categorError,
    isLoading: isCategoryLoading,
  } = useGetAllCategoryQuery();

  const {
    data: mentor,
    isError: isMentorError,
    isLoading: isMentorLoading,
    error: mentorError,
  } = useGetMentorsListQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (target?.length) {
      setCatFilter(target);
    }
  }, [target]);

  useEffect(() => {
    if (isCategoryError) {
      dispatch(
        handleError((categorError as any)?.data?.message || "Category error")
      );
    }
    if (isMentorError) {
      dispatch(
        handleError((mentorError as any)?.data?.message || "Mentor error")
      );
    }
  }, [isCategoryError, categorError, isMentorError, mentorError, dispatch, id]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const categoryIds = category?.data.map((cat) => cat._id);

  return (
    <MainLayout loading={isMentorLoading || isCategoryLoading}>
      <div className="bg-gradient-to-t from-white via-white to-primary-200">
        <div className="py-20">
          <div className="container mx-auto xl:lg:md:w-[65%] w-[95%] shadow-xl px-10 bg-white rounded-md py-10">
            <div className="flex flex-wrap-reverse items-center gap-10">
              <div className="flex-1 flex flex-col gap-3">
                <h1 className="text-5xl capitalize font-bold">
                  Talk to your{" "}
                  <span className="text-primary-500">
                    {catFilter === "all" ? "Mentor" : catFilter}
                  </span>
                </h1>
                <p className="text-gray-500">
                  Feeling lonely, anxious? Relationship problems? Let us help
                  you in your healing process. Find Top Mental Health experts
                  here. Start your first free chat
                </p>
              </div>
              <img
                src="https://static.wixstatic.com/media/11062b_918f77d49c6e47d395addb2e5dcef03c~mv2.jpg/v1/crop/x_539,y_0,w_2021,h_2048/fill/w_734,h_744,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_918f77d49c6e47d395addb2e5dcef03c~mv2.jpg"
                alt=""
                className="object-cover xl:lg:md:w-[300px] aspect-square rounded-full border-2 border-gray-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="container mx-auto px-5 pt-10">
            <div className="w-full bg-white p-5 rounded-xl shadow-md">
              <div className="flex flex-wrap justify-between flex-col md:flex-row gap-5">
                <Field className="flex flex-col">
                  <label className="text-gray-500 mb-1">Search</label>
                  <div className="bg-white border rounded-md px-4 py-2 flex items-center gap-3 shadow-sm">
                    <AiOutlineSearch size={20} />
                    <input
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="bg-transparent focus:outline-none w-full"
                      placeholder="Search Mentors"
                      type="search"
                    />
                  </div>
                </Field>

                <Field className="flex flex-col">
                  <Label className="text-gray-500 mb-1">Category</Label>
                  <Select
                    onChange={(e) => setCatFilter(e.target.value)}
                    className="border px-4 py-2 rounded-md"
                    value={catFilter}
                  >
                    <option value="all">All</option>
                    {[...(category?.data || [])]
                      .sort(
                        (a, b) =>
                          new Date(a.createdAt).getTime() -
                          new Date(b.createdAt).getTime()
                      )
                      .filter(
                        ({ title }) =>
                          title && !excludeTitles.includes(title.toUpperCase())
                      )
                      .map(({ title, _id }) => (
                        <option key={_id} value={title}>
                          {title.toUpperCase()}
                        </option>
                      ))}
                  </Select>
                </Field>

                <Field className="flex flex-col">
                  <Label className="text-gray-500 mb-1">Languages</Label>
                  <Select
                    onChange={(e) => setLangFilter(e.target.value)}
                    className="border px-4 py-2 rounded-md"
                    value={langFilter}
                  >
                    <option value="all">All</option>
                    {indianLanguages.map((lang, i) => (
                      <option key={i} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field className="flex flex-col">
                  <Label className="text-gray-500 mb-1">Specialists</Label>
                  <Select
                    onChange={(e) => setCatFilter2(e.target.value)}
                    className="border px-4 py-2 rounded-md"
                    value={catFilter2}
                  >
                    <option value="all">All</option>
                    {[...(category?.data || [])]
                      .sort(
                        (a, b) =>
                          new Date(a.createdAt).getTime() -
                          new Date(b.createdAt).getTime()
                      )
                      .filter(({ title }) =>
                        title && excludeTitles.includes(title.toUpperCase())
                      )
                      .map(({ title, _id }) => (
                        <option key={_id} value={title}>
                          {title.toUpperCase()}
                        </option>
                      ))}
                  </Select>
                </Field>

                <Field className="flex flex-col">
                  <Label className="text-gray-500 mb-1">Budget</Label>
                  <Select
                    onChange={(e) => setLangFilter(e.target.value)}
                    className="border px-4 py-2 rounded-md"
                    value={langFilter}
                  >
                    <option value="all">All</option>
                    {budget.map((bud, i) => (
                      <option key={i} value={bud}>
                        {bud}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="container mx-auto px-5 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentor?.data
                ?.filter((item) => {
                  const matchesSearch =
                    item.name?.firstName?.toLowerCase().includes(searchQuery) ||
                    item.name?.lastName?.toLowerCase().includes(searchQuery);
                  const matchesCategory =
                    catFilter === "all" ||
                    item.category?.some(
                      (cat) =>
                        cat && categoryIds.includes(cat._id) && cat.title === catFilter
                    );
                  const matchesSpecialist =
                    catFilter2 === "all" ||
                    item.category?.some(
                      (cat) =>
                        cat && categoryIds.includes(cat._id) &&
                        cat.title === catFilter2
                    );
                  return matchesSearch && matchesCategory && matchesSpecialist;
                })
                .filter((item) => {
                  if (langFilter === "all") return true;
                  return item.languages?.some((lang) => lang === langFilter);
                })
                .filter((item) => {
                  // ✅ Only show complete profiles
                  return (
                    item.description &&
                    item.specialists &&
                    item.specialists.length > 0
                  );
                })
                .sort((a, b) => {
                  const getPriority = (mentor) => {
                    if (mentor.isUnavailable) return 3; // 👈 Highest priority (lowest visibility)
                    if (mentor.accountStatus.online && mentor.inCall) return 2; // Busy
                    if (mentor.accountStatus.online && !mentor.inCall) return 1; // Online
                    return 4; // Offline
                  };
                  return getPriority(a) - getPriority(b);
                })
                .map((item, index) => (
                  <div key={index} className="p-1">
                    <div className="bg-white border border-[#CED2D6] p-4 rounded-[20px]">
                      <div className="flex flex-col md:flex-row md:items-start items-center">
                        <img
                          src={item.image}
                          alt={item?.auth?.username}
                          className="w-[60px] h-[60px] border-[2px] border-[#FE76A8] rounded-full object-cover"
                        />
                        <div className="md:ml-4 mt-4 md:mt-0 w-full">
                          <p className="text-[22px] font-medium text-black text-left">
                            {item?.name?.firstName} {item?.name?.lastName}
                          </p>
                          <Text
                            className="text-sm text-[#787887] font-normal text-left"
                            noOfLines={1}
                          >
                            {item.qualification}
                          </Text>

                          <p className="text-sm font-normal mt-2">
                            {item.isUnavailable ? (
                              <span className="ml-2 bg-gray-500 text-white px-3 py-1 rounded-full text-xs">
                                Unavailable
                              </span>
                            ) : item.accountStatus.online ? (
                              item.inCall ? (
                                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs">
                                  Busy
                                </span>
                              ) : (
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                                  Online
                                </span>
                              )
                            ) : (
                              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                                Offline
                              </span>
                            )}

                            {}
                          </p>
                          {item?.languages?.length > 0 && (
                            <>
                              <p className="text-sm font-bold text-[#414146] mt-2">
                                Languages
                              </p>
                              <Text
                                className="text-sm text-[#414146] mt-1"
                                noOfLines={1}
                              >
                                {item.languages.join(", ")}
                              </Text>
                            </>
                          )}

                          {item?.specialists?.length > 0 && (
                            <>
                              <p className="text-sm font-bold text-[#414146] mt-2">
                                Specialization
                              </p>
                              <Text
                                className="text-sm text-[#414146] mt-1"
                                noOfLines={1}
                              >
                                {item.specialists.join(", ")}
                              </Text>
                            </>
                          )}

                          <div className="flex flex-col lg:flex-row gap-3 mt-4 w-full">
                            <button
                              className="bg-[#EFF2F7] text-black font-semibold py-3 px-7 rounded-full w-full"
                              onClick={() =>
                                navigate(`/user/mentor/details/${item._id}`)
                              }
                            >
                              View Profile
                            </button>
                            <button
                              className="bg-[#D86570] text-white font-semibold py-3 px-7 rounded-full w-full"
                              onClick={() =>
                                navigate(`/user/mentor/details/${item._id}`)
                              }
                            >
                              Book Session
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
