import React, { useRef } from "react";
import { MainLayout } from "../../../../layout";
import { AppButton, MentorCard } from "../../../../component";
import { useNavigate } from "react-router-dom";
import { useGetMentorsListQuery } from "../../../../redux/rtk-api";
import { ICategoryProps } from "../../../../interface";
import { useAuthenticationSlice } from "../../../../redux/features";

export const MentalHealthPage = () => {
  const navigate = useNavigate();
  const { data: mentors } = useGetMentorsListQuery();
  const { authentication } = useAuthenticationSlice();
  const useMentorDiv = useRef(null);

  const helpPoint: string[] = [
    "Anxiety",
    "Depression",
    "Stress Management",
    "Self-esteem and self-confidence",
    "Anger management",
    "Coping with grief and loss",
    "Communication skills",
    "Assertiveness training",
    "Boundary setting",
    "Emotional regulation",
    "Goal setting and motivation",
    "Relationship issues",
    "Marriage counselling",
    "Family dynamics",
    "Parenting skills",
    "Work-life balance",
    "Career counselling",
    "Personal growth and development",
    "Coping with life transitions",
    "Addiction recovery",
    "Trauma healing",
    "PTSD (Post-Traumatic Stress Disorder)",
    "Phobias and fears",
    "Sleep disorders and insomnia",
    "Chronic illness management",
  ];
  const Methodologies: { title: string; description: string }[] = [
    {
      title: "Cognitive Behavioral Therapy (CBT)",
      description:
        "Together, we'll uncover the root causes of your negative thought patterns and develop practical strategies to challenge and reframe them.",
    },
    {
      title: "Mindfulness Practices",
      description:
        "Through mindfulness exercises and meditation, we'll cultivate present-moment awareness, allowing you to find peace and clarity in the here and now.",
    },
    {
      title: "Emotion Regulation Techniques",
      description:
        "Learn to navigate the ebb and flow of your emotions with grace and resilience, developing healthy coping mechanisms to manage stress and anxiety.",
    },
    {
      title: "Stress Management Strategies",
      description:
        "Discover personalized tools and techniques to cope with life's stressors, build resilience, and foster a sense of balance and well-being.",
    },
    {
      title: "Positive Psychology Interventions",
      description:
        "Together, we'll explore the power of gratitude, optimism, and self-compassion, helping you cultivate a positive mindset and enhance your overall psychological well-being.",
    },
  ];

  const whatToGet: string[] = [
    "Gain a deeper understanding of yourself, your thoughts, and your emotions.",
    "Get acquainted with practical tools and strategies to manage stress, anxiety, and depression.",
    "Strengthen your relationships, communication skills, and emotional resilience.",
    "Cultivate a greater sense of self-esteem, confidence, and well-being.",
    "Experience a renewed sense of purpose, joy, and fulfilment in your life.",
    "Discover the peace and clarity that comes from embracing your inner wisdom and resilience.",
  ];
  return (
    <MainLayout>
      <div className="py-10 flex items-center flex-col space-y-6  xl:px-32">
        <h1 className="text-4xl text-primary-500 font-semibold">
          MENTAL HEALTH
        </h1>
        <h3 className="text-3xl">
          Your Journey to Mental Wellness Begins Here
        </h3>
        
        <div className="text-left w-full">
        <h4  className="text-2xl">
          Find Compassionate Support To Navigate Through Life's Challenges with
          Confidence
        </h4>
          <h5 className="text-lg font-bold text-primary-500">
            WE UNDERSTAND YOUR PAINS:
          </h5>
          <p className="text-lg mt-3 text-gray-500">
            The journey of life frequently resembles a narrow road with many
            unexpected bends and twists. Along the road, we could encounter
            obstacles that appear impossible to solve, emotional weights that
            feel impossible to bear, and feelings that might overpower us.
          </p>
        </div>
        <div className="grid xl:grid-cols-2 gap-3 w-full py-10 items-center">
          <div>
            <ul className="list-inside space-y-3">
              <li className="list-disc text-lg">
                Do you struggle with{" "}
                <span className="text-primary-500">anxiety</span>, feeling its
                grip tighten each day?
              </li>
              <li className="list-disc text-lg">
                Do you feel weighed down by{" "}
                <span className="text-primary-500">depression</span>, struggling
                to find light in the darkness?
              </li>
              <li className="list-disc text-lg">
                Does daily <span className="text-primary-500">stress</span>{" "}
                leave you exhausted, overwhelmed, and uncertain?
              </li>
              <li className="list-disc text-lg">
                Are you navigating{" "}
                <span className="text-primary-500">complex relationships</span>,
                feeling lost, unsure of your path?
              </li>
              <li className="list-disc text-lg">
                Have you experienced{" "}
                <span className="text-primary-500">trauma, loss, or grief</span>{" "}
                that has left scars that ache?
              </li>
              <li className="list-disc text-lg">
                Feel{" "}
                <span className="text-primary-500">
                  overwhelmed by life's demands?
                </span>
              </li>
              <li className="list-disc text-lg">
                Battle with{" "}
                <span className="text-primary-500">
                  low self-esteem or confidence?
                </span>
              </li>
              <li className="list-disc text-lg">
                Are you unable to cope with{" "}
                <span className="text-primary-500">relationship issues</span> or
                family conflicts?
              </li>
              <li className="list-disc text-lg">
                Experiencing{" "}
                <span className="text-primary-500">
                  uncertainty about career choices?
                </span>
              </li>
            </ul>
          </div>
          <div>
            <img
              src={require("../../../../assets/image/mental-health-2.jpg")}
              alt={"pic"}
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="space-y-5 w-full text-left">
          <div className="space-y-3">
            <p className="text-lg text-gray-500">
              Know that you are not alone in these struggles. We've been there
              too, facing our own battles with anxiety, depression, and
              uncertainty.
            </p>
            <p className="text-lg text-gray-500">
              We understand the pain of feeling lost, the heaviness of carrying
              burdens, and the longing for peace and clarity in the midst of
              chaos.
            </p>
            <p className="text-xl text-primary-500">
              But we also know that it doesn't have to be this way. You deserve
              to experience a life filled with joy, purpose, and fulfilment. You
              deserve to embrace your inner peace and navigate life's challenges
              with confidence and resilience.
            </p>
          </div>
        </div>
        <div className="text-left w-full">
          <h5 className="text-lg font-bold  text-primary-500">THE SOLUTION:</h5>
          <p className="text-lg text-gray-500 mt-3">
            At AlterBuddy, we offer more than just a listening ear or a shoulder
            to lean on. We provide a safe and nurturing space where you can
            explore your feelings, unpack your thoughts, and embark on a journey
            of self-discovery and healing.
          </p>
        </div>
        <div className="text-left w-full">
          <h5 className="text-xl font-bold  text-primary-500 text-center">
            WE HELP WITH:
          </h5>
          <div className="gap-5 flex flex-wrap mt-3 justify-center">
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
        <div className="w-full">
          <h5 className="text-2xl font-bold  text-primary-500 text-center">
            OUR METHODOLOGIES:
          </h5>
          <div className="grid justify-center mt-5 gap-5 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
            {Methodologies.map(({ description, title }, i) => (
              <div
                key={i}
                className="border mx-auto hover:cursor-pointer hover:bg-primary-50 transition-colors duration-150 group rounded-lg p-3"
              >
                <h6 className="text-xl text-center group-hover:text-primary-500 font-semibold">
                  {title}
                </h6>
                <p className="text-gray-500 text-center group-hover:text-gray-950">
                  {description}
                </p>
              </div>
            )).slice(0, 4)}
          </div>
          <div className="mt-5 border xl:w-[50%] mx-auto hover:cursor-pointer hover:bg-primary-50 transition-colors duration-150 group rounded-lg p-3">
            <h6 className="text-xl group-hover:text-primary-500 font-semibold text-center">
              Positive Psychology Interventions
            </h6>
            <p className="text-gray-500 group-hover:text-gray-950 text-center">
              Together, we'll explore the power of gratitude, optimism, and
              self-compassion, helping you cultivate a positive mindset and
              enhance your overall psychological well-being.
            </p>
          </div>
        </div>
        <div className="py-10">
          <h5 className="text-2xl font-bold  text-primary-500 text-center">
            WHAT DO YOU GET?
          </h5>
          <div className="mt-3 container mx-auto items-center grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            <div className="object-cover flex justify-center items-center col-span-1">
              <img
                src={require("../../../../assets/image/youssef-naddam-iJ2IG8ckCpA-unsplash.jpg")}
                alt={whatToGet[0]}
                className="rounded-lg w-[50%]"
              />
            </div>
            <div className="col-span-1">
              <ul className="list-inside space-y-3">
                {whatToGet.map((element) => (
                  <li key={element} className="list-disc text-lg">
                    {element}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="text-primary-500 text-lg">
          IN SHORT ‘YOU GET TO MEET THE BEST VERSION OF YOURSELF’
        </p>
        <div className="text-center">
          <p className="text-center italic text-lg">
            "As you embark on your journey to mental wellness, remember that
            every step you take, no matter how small, brings you closer to the
            peace, joy, and fulfillment you seek. Trust in the process, believe
            in your strength, and know that you are never alone."
          </p>
          <p className="text-lg">- Brene Brown</p>
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
      </div>
      <div ref={useMentorDiv} id="targetDiv" className=" xl:lg:md:px-10 px-3">
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
                (props.category as ICategoryProps[])[0]._id ===
                "657a9dda24b91a24043c71ec"
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
