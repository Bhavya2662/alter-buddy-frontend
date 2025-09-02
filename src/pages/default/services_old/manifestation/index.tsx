import React, { useRef } from "react";
import { MainLayout } from "../../../../layout";
import { AppButton, MentorCard } from "../../../../component";
import { useNavigate } from "react-router-dom";
import { ICategoryProps } from "../../../../interface";
import { useGetMentorsListQuery } from "../../../../redux/rtk-api";
import { useAuthenticationSlice } from "../../../../redux/features";

export const ManifestationPage = () => {
  const { data: mentors } = useGetMentorsListQuery();
  const { authentication } = useAuthenticationSlice();
  const useMentorDiv = useRef(null);

  const navigate = useNavigate();

  const desirePoints: string[] = [
    "✔ Living With Your Loving Soulmate",
    "✔ Scaling the heights of Success",
    "✔ Making Immense amounts of Money",
    "✔ Attracting Top-Notch, High-paying Clients",
    "✔ Having That Perfect Dream Body",
    "✔ Living a Purpose-Driven Life",
  ];
  const wantMore: string[] = [
    "Deeper Love and Relationships",
    "More Money To Create A Powerful Impact",
    "A healthy life",
    "Soul-Stirring Abundance",
  ];
  const somewhere: string[] = [
    "➤ Are spending years trying to succeed in a business that isn’t our purpose.",
    "➤ Forever pushing and hustling to reach our next big business goal which leaves us feeling depleted and burnt out.",
    "➤ Are not happy in our relationships.",
  ];
  const imaginPoints: string[] = [
    "✔ Manifest more money doing what you love",
    "✔ Reach your next degree of success and impact.",
    "✔ Attract Dream Clients",
    "✔ Call in your Soulmate",
    "✔ Attract new Friendships",
    "✔ Deepen your Spiritual Connection",
    "✔ Discover your Purpose",
    "✔ Manifest Weight Loss",
    "✔ Uplevel ALL areas of your Life - health, relationships, home",
  ];
  const weGive: string[] = [
    "✔ CHANNELLED GUIDANCE",
    "✔ INTUITIVE HEALING",
    "✔ ADVANCED ENERGETIC TECHNIQUES",
  ];
  return (
    <MainLayout>
      <div className="py-10 flex items-center flex-col space-y-6 xl:px-32">
        <h1 className="text-4xl text-primary-500 font-semibold">
          MANIFESTATION
        </h1>
        <h3 className="text-3xl">
          Ready To Manifest Your Next Level of Abundance and Success?
        </h3>
        <div className="text-left w-full">
          <p className="text-lg mt-3 text-gray-500 text-center">
            We all have that one desire- and that is having a perfect life. A
            life where we are:
          </p>
        </div>
        <div className="py-10 grid grid-cols-1 w-full xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
          <div className="flex justify-center items-center">
            <img
              src={require("../../../../assets/image/manifestation.jpeg")}
              alt={desirePoints[0]}
              className="w-[70%] rounded-md"
            />
          </div>
          <div>
            <ul className="space-y-3">
              {desirePoints.map((element) => (
                <li key={element} className="text-lg">
                  {element}
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-5">
              <p>AND ABOVE ALL ELSE…</p>
              <p className="font-bold">We Want To Be Happy!</p>
            </div>
          </div>
        </div>
        <div className="w-full text-left">
          <p>
            We know how it feels to have a burning desire for wanting more in
            life.
          </p>
          <ul className="pl-5 mt-5">
            {wantMore.map((element) => (
              <li key={element} className="text-lg">
                - {element}
              </li>
            ))}
          </ul>
          <div className="space-y-3 mt-5">
            <p>BUT</p>
            <p>
              We also don’t want to keep pushing, hustling, and working till it
              hurts, to get it!
            </p>
            <p>Somewhere every one of us :</p>
            <div className="w-full">
              <ul className="space-y-3">
                {somewhere.map((element) => (
                  <li className="text-md ">{element}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-5 pt-5">
              <p className="text-lg">
                We want you to know that the Impact, Success, Love, Money, and
                Abundance you are seeking will not come from looking outside of
                yourself, It will come from changing from within.
              </p>
              <p className="text-lg">
                Because the minute we change our inner vibration, our outer
                reality changes to reflect that.
              </p>
            </div>
            <p className="text-primary-500 font-semibold text-center text-xl pt-5">
              It is a universal law.
            </p>
          </div>
        </div>
        <div className="py-5">
          <AppButton
            onClick={() => {
              if (!authentication) {
                navigate("/sign-in");
              } else {
                useMentorDiv.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
            outlined
          >
            TALK TO US NOW!
          </AppButton>
        </div>
        <div className="w-full">
          <p className="text-xl">
            And believe us when we say that, we have seen amazing results
            happening.
          </p>
          <h5 className="text-lg font-bold  text-primary-500 pt-5 text-center">
            IMAGINE IF YOU COULD:
          </h5>
          <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mt-10">
            <div>
              <ul className="space-y-3 mt-5">
                {imaginPoints.map((element) => (
                  <li key={element} className="text-lg">
                    {element}
                  </li>
                ))}
              </ul>
              <div className="space-y-3 mt-5">
                <p>AND</p>
                <p>Become the ULTIMATE MANIFESTOR you were born to be!</p>
                <p>THIS CAN ALL BE YOURS!</p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <img
                src={require("../../../../assets/image/manifestation-secondary.jpeg")}
                alt={imaginPoints[0]}
                className="w-[70%] rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="py-10">
          <AppButton
            onClick={() => {
              if (!authentication) {
                navigate("/sign-in");
              } else {
                useMentorDiv.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
            outlined
          >
            TALK TO US NOW!
          </AppButton>
        </div>
        <div className="w-full">
          <p className="text-lg">
            We connect with you one-on-one and give you the inner transformation
            necessary to achieve the outer results you desire
          </p>
        </div>
        <div className="w-full">
          <h5 className="text-lg font-bold  text-primary-500">WE GIVE YOU:</h5>
          <ul className="mt-5 space-y-3">
            {weGive.map((element) => (
              <li key={element}>{element}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 w-full">
          <p>
            We firmly believe in searching deep inside to find your true desires
            and then taking the necessary steps to bring them to fruition.
          </p>
          <p className="font-extrabold">THIS IS WHAT WE CALL MANIFESTING.</p>
        </div>
        <div className="py-10">
          <AppButton
            onClick={() => {
              if (!authentication) {
                navigate("/sign-in");
              } else {
                useMentorDiv.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
            outlined
          >
            TALK TO US NOW!
          </AppButton>
        </div>
        <div>
          <p className="italic text-center text-lg">
            "True manifestation is not about changing the world around you, but
            rather, changing the world within you. When you align your thoughts,
            emotions, and actions with your deepest desires, miracles happen."
          </p>
        </div>
      </div>
      <div ref={useMentorDiv} id="targetDiv" className="xl:lg:md:px-10 px-3">
        <div className="my-5">
          <h6 className="text-3xl capitalize font-semibold">
            Meet <span className="text-primary-500">mental health</span> coaches
          </h6>
          <p className="text-gray-500">Talk to your buddy</p>
        </div>
        <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-10">
          {mentors?.data
            .filter(
              (props) =>
                (props.category as ICategoryProps[])[1]?._id ===
                "657ab042a06dda5fc00e47ca"
            )
            .map(
              ({
                name,
                accountStatus,
                category,
                specialists,
                _id,
                image,
                description,
                languages,
              }) => (
                <MentorCard
                  key={_id}
                  expertise={
                    (category as ICategoryProps[])
                      .map((prop) => {
                        return prop.title.toLowerCase();
                      })
                      .join(", ") as unknown as string
                  }
                  languages={languages.join(", ")}
                  fname={name.firstName}
                  lname={name.lastName}
                  description={description}
                  image={
                    image?.length
                      ? image
                      : "https://qph.cf2.quoracdn.net/main-qimg-5b495cdeb2ebb79cff41634e5f9ea076"
                  }
                  specialist={specialists}
                  verified={accountStatus.verification}
                  id={_id as string}
                />
              )
            )}
        </div>
      </div>
    </MainLayout>
  );
};
