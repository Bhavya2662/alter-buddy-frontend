import React, { useEffect } from "react";
import { MainLayout } from "../../../../layout";
import { AppButton } from "../../../../component";
import { useNavigate } from "react-router-dom";
import { useAuthenticationSlice } from "../../../../redux/features";
import { toast } from "react-toastify";
import { useLazyProfileUserQuery } from "../../../../redux/rtk-api";

export const RantPage = () => {
  const { authentication } = useAuthenticationSlice();
  const [GetProfile, { data: profile }] = useLazyProfileUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication) {
      (async () => {
        await GetProfile();
      })();
    }
  }, [GetProfile, authentication]);

  const understandPoint: string[] = [
    "Overwhelming Stress",
    "Emotional Turmoil",
    "Bottled-up Feelings",
    "Communication Barriers",
    "Mental Exhaustion",
    "Loneliness and Isolation",
    "Decision Paralysis",
    "Lack of Support",
    "Coping with Trauma",
    "Seeking Validation",
  ];
  const Methodologies: { title: string; description: string }[] = [
    {
      title: "Active Listening",
      description:
        "Our listeners are trained to provide empathetic and non-judgmental support, allowing you to express yourself freely.",
    },
    {
      title: "Emotional Validation",
      description:
        "We understand that your feelings are valid, and we're here to acknowledge and validate them without criticism.",
    },
    {
      title: "Confidentiality",
      description:
        "Your privacy is our priority. Rest assured that anything you share during your rant session will be kept confidential.",
    },
  ];
  const getPoint: string[] = [
    "Release pent-up emotions and frustrations, leading to a sense of relief.",
    "Feel heard, understood, and supported in a safe and non-judgmental environment.",
    "Gain clarity and perspective on your challenges by expressing them openly and honestly.",
    "Reduce stress and tension, promoting overall emotional well-being and mental health.",
  ];
  return (
    <MainLayout>
      <div className="py-10 flex items-center flex-col space-y-6 xl:px-32">
        <h1 className="text-4xl text-primary-500 font-semibold">
          RANT (VENT IT OUT)
        </h1>
        <h3 className="text-3xl">
          Release, Renew, Reclaim: Embrace relief with our Rant Support
        </h3>
        <div className="w-full">
          <h4 className="text-xl">
            Let Go of Stress and Tension in a Safe Environment, without the fear
            of being judged.
          </h4>
          <div className="space-y-5 mt-5">
            <p>
              Our Rant (Vent it Out) Services, where your feelings find a safe
              harbour amidst life's storms. We understand that sometimes, the
              weight of emotions can be too heavy to carry alone
            </p>
            <p>
              That's why we're here, offering you a compassionate space to
              unload, express, and release whatever's weighing on your heart and
              mind.
            </p>
            <p>
              We believe that sharing your burdens is the first step towards
              healing, and we're here to listen, without judgement or
              interruption. So take a deep breath, let it all out, and know that
              you're not alone on this journey.
            </p>
          </div>
        </div>

        <h5 className="text-lg font-bold text-primary-500 text-center py-10">
          WE UNDERSTAND YOUR PAINS:
        </h5>
        <div className="grid w-full items-center grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
          <div>
            <ul className="list-inside space-y-3 mt-5 pl-8">
              {understandPoint.map((element, i) => (
                <li key={element} className="text-lg">
                  {i + 1}. {element}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img
              src={require("../../../../assets/image/rant.jpeg")}
              alt={understandPoint[0]}
              className="w-[70%] rounded-lg"
            />
          </div>
        </div>
        <div className="space-y-5 mt-10 w-full text-lg">
          <p>
            Bottling up emotions and frustrations can lead to increased stress
            and tension. You feel overwhelmed by life's challenges without an
            outlet for release.
          </p>
          <p>
            If you are struggling to find someone who will listen without
            judgement or interruption
          </p>
        </div>
        <div className="py-10">
          <AppButton
            onClick={() => {
              if (profile?.data) {
                navigate("/anonymous-rant");
              } else {
                toast.warn("please login first");
                navigate("/sign-in");
              }
            }}
            outlined
          >
            FEEL FREE TO CONNECT WITH US
          </AppButton>
        </div>
        <p className="text-lg">
          Whether you're dealing with work-related stress, relationship issues,
          or simply need to vent about life's frustrations, our trained
          listeners are here to offer support and understanding. You can pour
          out your heart without fear of judgement or interruption, allowing you
          to release negative emotions and find relief.
        </p>
      </div>
      <div className="w-full px-10">
        <h5 className="text-lg font-bold  text-primary-500 text-center">
          OUR METHODOLOGIES:
        </h5>
        <div className="grid items-center  mt-5 gap-5 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 grid-cols-1">
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
          ))}
        </div>

        <div className="py-10 px-10">
          <h5 className="text-lg font-bold text-primary-500 text-center">
            WHAT DO YOU GET?
          </h5>
          <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mt-5 items-center">
            <div className="flex justify-center items-center">
              <img
                src={require("../../../../assets/image/rant-background.jpeg")}
                alt={getPoint[0]}
                className="w-[70%] rounded-lg"
              />
            </div>
            <div>
              <ul className="list-inside space-y-5">
                {getPoint.map((element) => (
                  <li key={element} className="list-disc text-lg">
                    {element}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="py-10 flex justify-center">
          <AppButton
            onClick={() => {
              if (profile?.data) {
                navigate("/anonymous-rant");
              } else {
                toast.warn("please login first");
                navigate("/sign-in");
              }
            }}
            outlined
          >
            FEEL FREE TO CONNECT WITH US
          </AppButton>
        </div>
        <p className="italic text-center pb-10">
          "Sometimes, the most powerful thing you can do is simply let it out.
          By giving voice to your struggles and frustrations, you create space
          for healing and transformation to occur."
        </p>
      </div>
    </MainLayout>
  );
};
