import React, { useRef } from "react";
import { MainLayout } from "../../../../layout";
import { AppButton, MentorCard } from "../../../../component";
import { useNavigate } from "react-router-dom";
import { ICategoryProps } from "../../../../interface";
import { useGetMentorsListQuery } from "../../../../redux/rtk-api";
import { useAuthenticationSlice } from "../../../../redux/features";

export const HealingPage = () => {
  const { data: mentors } = useGetMentorsListQuery();
  const { authentication } = useAuthenticationSlice();
  const useMentorDiv = useRef(null);

  const navigate = useNavigate();

  const helpPoint: string[] = [
    "Emotional distress",
    "Relationship conflicts",
    "Family issues",
    "Trauma Recovery",
    "Grief and loss",
    "Stress management",
    "Anxiety and panic attacks",
    "Depression",
    "Low self-esteem",
    "Anger management",
    "Addiction recovery",
    "Life transitions",
    "Work-related stress",
    "Burnout prevention",
    "Personal growth and development",
    "Coping with chronic illness",
    "Self-discovery and identity exploration",
    "Healing from past abuse",
    "Spiritual crises",
    "Goal setting and achievement",
    "Communication skills improvement",
    "Boundary setting and assertiveness training",
    "Coping with perfectionism",
    "Overcoming procrastination",
    "Building resilience and coping skills",
  ];

  const Methodologies: { title: string; description: string }[] = [
    {
      title: "Tarot Reading",
      description:
        "Using a deck of cards to gain insights into past, present, and future events, providing guidance and clarity on life's questions and challenges.",
    },
    {
      title: "Psychic Reading",
      description:
        "Tapping into intuitive abilities to perceive information beyond the five senses, offering guidance and predictions about various aspects of life.",
    },
    {
      title: "Automatic Reading",
      description:
        "Channeling subconscious thoughts and energies to provide spontaneous insights and messages without conscious control or interpretation.",
    },
    {
      title: "Ancient Divine Reading",
      description:
        "Drawing upon ancient divination methods and rituals to access higher wisdom and spiritual guidance for individuals seeking clarity and direction.",
    },
    {
      title: "Numerology Reading",
      description:
        "Analysing numbers and their symbolic meanings to uncover insights about personality traits, life paths, and future possibilities.",
    },
    {
      title: "Face Reading",
      description:
        "Interpreting facial features and expressions to understand personality traits, emotions, and life patterns, providing insights into individual behaviour and character.",
    },
    {
      title: "Pendulum Reading",
      description:
        "Using a swinging pendulum to access subconscious knowledge and spiritual guidance, providing yes or no answers to specific questions.",
    },
    {
      title: "Soul Reading",
      description:
        "Connecting with an individual's soul essence to uncover deep-seated truths, past-life experiences, and spiritual lessons for personal growth and healing.",
    },
    {
      title: "Akashic Records",
      description:
        "Gain insights into past, present, and future accessing universal energy for spiritual growth. Our experts help you uncover valuable information and wisdom to support your spiritual journey and personal growth.",
    },
    {
      title: "Cord Cutting",
      description:
        "A powerful technique for cutting cords with toxic relationships. We facilitate the removal of attachments that may be draining your energy or hindering your progress. This leads to a greater sense of freedom, clarity, and emotional well-being.",
    },
    {
      title: "Mediumship",
      description:
        "Communicating with spirits of the deceased to provide messages, closure, and reassurance to the living, facilitating healing and connection with the spirit world.",
    },
  ];
  const GetPoinst: string[] = [
    "Clarity and understanding about your life situations and challenges.",
    "Validation of your intuitions.",
    "Resolution of emotional blockages.",
    "Guidance on making important life decisions.",
    "Relief from anxiety and stress",
    "Empowerment to take control of your life.",
    "Healing of past traumas and emotional wounds.",
    "Reassurance and comfort from connecting with departed loved ones.",
    "Insights into your strengths and weaknesses.",
    "Confirmation of your path and direction in life.",
    "Healing and closure from unresolved issues and grief.",
    "Enhanced personal growth.",
  ];
  return (
    <MainLayout>
      <div className="py-10 flex items-center flex-col space-y-6  xl:px-32">
        <h1 className="text-4xl text-primary-500 font-semibold">HEALING</h1>
        <h3 className="text-3xl">
          Transform Pain into Power: Embrace Healing and Wholeness
        </h3>
        <p className="text-lg mt-3 text-gray-500">
          Release Past Traumas and Experience Profound Healing on a Physical,
          Emotional, and Spiritual Level
        </p>
        <div className="text-left w-full">
          <h5 className="text-xl font-bold text-primary-500 text-center">
            WE UNDERSTAND YOUR PAINS:
          </h5>
          <p className="text-lg mt-3 text-gray-500 text-center">
            Our spiritual and emotional scars from life's journey can be very
            heavy on our hearts and souls. Unsolved sorrow, unsolved traumas,
            and lingering emotions can weigh us down and prevent us from
            reaching true peace and clarity.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center">
          <div>
            <ul className="space-y-3 list-item">
              <li className="list-disc text-lg">
                Do you find it{" "}
                <span className="text-primary-500">
                  {" "}
                  difficult to forgive and let go
                </span>{" "}
                of the hurts and betrayals from the past?
              </li>
              <li className="list-disc text-lg">
                Are you having{" "}
                <span className="text-primary-500">
                  trouble finding closure and acceptance
                </span>{" "}
                because of the memories of loss, grief, or abandonment?
              </li>
              <li className="list-disc text-lg">
                Do you wish you could{" "}
                <span className="text-primary-500">
                  reconnect with your inner
                </span>{" "}
                self and recover your sense of significance and purpose?
              </li>
              <li className="list-disc text-lg">
                Are you navigating personal problems or mental obstacles and{" "}
                <span className="text-primary-500">
                  looking for direction and clarity?
                </span>
              </li>
              <li className="list-disc text-lg">
                Do you long to connect with people, the world, and yourself on a
                deeper level, yet feel{" "}
                <span className="text-primary-500">
                  blocked by fear, doubt, or uncertainty?
                </span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={require("../../../../assets/image/manifestation2.jpeg")}
              alt={"pic"}
              className="w-[60%] rounded-lg"
            />
          </div>
        </div>
        <p className="text-lg">
          Trust us when we say this, that you are not alone. We and many people
          like us have walked similar paths, facing their battles with pain and
          uncertainty. And through healing have beautifully found their way back
          to wholeness.
        </p>
        <h5 className="text-lg font-bold text-primary-500">THE SOLUTION:</h5>
        <p className="text-lg">
          At AlterBuddy, we're more than just listeners. Here, we create a safe
          sanctuary for your innermost thoughts and emotions to flourish. It's a
          journey of self-discovery and healing, where every step is embraced
          with warmth and compassion
        </p>
        <div>
          <h5 className="text-lg font-bold text-primary-500 text-center">
            WE UNDERSTAND YOUR PAINS:
          </h5>
          <div className="gap-5 flex flex-wrap mt-3">
            {helpPoint.map((element) => (
              <div
                key={element}
                className="bg-primary-500 px-5 py-2 rounded-lg hover:bg-primary-500/60 transition-colors duration-300 cursor-pointer"
              >
                <p className="text-white">{element}</p>
              </div>
            ))}
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
        <div>
          <h5 className="text-lg font-bold text-primary-500 text-center">
            OUR METHODOLOGIES:
          </h5>
          <div className="grid items-center  mt-5 gap-5 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
            {Methodologies.map(({ description, title }, i) => (
              <div
                key={i}
                className="border hover:cursor-pointer hover:bg-primary-50 transition-colors duration-150 group rounded-lg p-3"
              >
                <h6 className="text-xl text-center group-hover:text-primary-500 font-semibold">
                  {title}
                </h6>
                <p className="text-gray-500 text-center group-hover:text-gray-950">
                  {description}
                </p>
              </div>
            )).slice(0, Methodologies.length - 1)}
          </div>
          <div className="border w-[50%] mx-auto mt-5 hover:cursor-pointer hover:bg-primary-50 transition-colors duration-150 group rounded-lg p-3">
            <h6 className="text-xl text-center group-hover:text-primary-500 font-semibold">
              Mediumship
            </h6>
            <p className="text-gray-500 text-center group-hover:text-gray-950">
              Communicating with spirits of the deceased to provide messages,
              closure, and reassurance to the living, facilitating healing and
              connection with the spirit world.
            </p>
          </div>
        </div>
        <div className="w-full">
          <h5 className="text-lg font-bold text-primary-500 text-center">
            WHAT DO YOU GET?
          </h5>
          <div className="grid grid-cols-1 pt-5 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center">
            <div className="flex items-center justify-center">
              <img
                src={require("../../../../assets/image/image5.jpg")}
                alt={GetPoinst[0]}
                className="w-[70%] rounded-lg"
              />
            </div>
            <div>
              <ul className="list-inside space-y-3">
                {GetPoinst.map((element) => (
                  <li key={element} className="list-disc">
                    {element}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="text-primary-500 text-lg py-10">
          IN SHORT ‘WE BECOME YOUR GUIDING ANGEL ON YOUR JOURNEY TOWARDS GROWTH’
        </p>
        <div>
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
        <div className="text-center">
          <p className="italic mt-3 text-lg">
            "Believe in yourself and your dreams, for you are the architect of
            your destiny. Let your actions speak louder than your fears."
          </p>
          <p className="font-semibold">- Brendon Burchard</p>
        </div>
      </div>
      <div
        ref={useMentorDiv}
        id="targetDiv"
        className=" xl:lg:md:px-10 px-3 mb-20"
      >
        <div className="my-5">
          <h6 className="text-3xl capitalize font-semibold">
            Meet <span className="text-primary-500">mental health</span> coaches
          </h6>
          <p className="text-gray-500">Talk to your buddy</p>
        </div>
        <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-10">
          {mentors?.data
            .filter(
              (mentor) =>
                (
                  mentor.category.find(
                    (category: ICategoryProps) =>
                      category._id === "657a9dc924b91a24043c71e9"
                  ) as ICategoryProps
                )?._id === "657a9dc924b91a24043c71e9"
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
