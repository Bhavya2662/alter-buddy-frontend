import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

export interface ContentProps {
  path: string;
  pageTitle: string;
}

interface ServicesSliceProps {
  FAQ: {
    question: string;
    answer: string;
  }[];
  howWeWish: {
    mainTitle: string;
    points: string[];
    conclusionTitle: string;
    conclusion: string;
  };
  pageContent: ContentProps[];
}

const initialState: ServicesSliceProps = {
  FAQ: [
    {
      question: "What is AlterBuddy and what value does it provide?",
      answer: `
      <p>AlterBuddy isn't just a platform; it's your companion on the journey to mental well-being and personal growth. It's a haven where you can explore healing, manifestation, and self-discovery. By providing tailored resources and expert guidance, AlterBuddy empowers you to manifest positive changes and cultivate a life of balance and fulfillment.</p>
    `,
    },
    {
      question: "How can AlterBuddy help me?",
      answer: `
      <p>AlterBuddy empowers you on your mental health and personal development journey through personalized healing resources, 1:1 sessions, guided meditation sessions, expert advice, and manifestation tools, fostering a positive and transformative mindset.</p>
    `,
    },
    {
      question: "Who are buddies, healers, and genies?",
      answer: `
      <p><strong classBane="font-semibold">Buddies</strong> are more than just psychologists; they're compassionate companions on your journey to healing and growth, offering support and understanding every step of the way.</p><br/>
      <p><strong>Healers</strong> bring their expertise and empathy to help you navigate challenges and find inner peace.</p><br/>
      <p><strong>Genies</strong> are like mentors, offering wisdom and guidance to help you unlock your full potential and manifest your dreams.</p>
    `,
    },
    {
      question: "What is the 'RANT' feature at AlterBuddy?",
      answer: `
      <p>The "RANT" feature at AlterBuddy allows you to book a call and express your feelings openly for 15 minutes, providing a therapeutic space to purge and release emotions in a supportive and confidential environment.</p>
    `,
    },
    {
      question: "How can I talk to a therapist on AlterBuddy?",
      answer: `
      <p>You can engage with buddies, healers, and genies on AlterBuddy through both chat and audio calls, offering a seamless and flexible communication experience for your mental health and well-being needs.</p>
    `,
    },
    {
      question: "How do I sign up/login on AlterBuddy?",
      answer: `
      <p>To create an account on AlterBuddy, simply visit our website, click on the <span className="text-red-500">"Login"</span> button, and follow the easy step-by-step registration process to unlock access to our transformative, mental health, manifestation and healing services.</p>
    `,
    },
    {
      question: "Is my privacy and anonymity guaranteed on AlterBuddy?",
      answer: `
      <p>Yes, at AlterBuddy, we prioritize your privacy and anonymity. Your personal information is treated with the utmost confidentiality and our platform is designed to ensure a secure and discreet environment for your mental health and well-being journey. You also have the option to use ALIAS or pseudonyms to provide you with a safe space where you can express yourself without revealing your identity to your peers.</p>
    `,
    },
    {
      question:
        "Can I share my personal stories and experiences on AlterBuddy?",
      answer: `
      <p>Certainly! On AlterBuddy, feel free to share your personal stories and experiences in a supportive and non-judgmental environment, fostering connection and understanding of your mental health and manifesting journey, anonymously.</p>
    `,
    },
    {
      question: "How can I connect with others on AlterBuddy?",
      answer: `
      <p>To connect with others on AlterBuddy, explore our community forums, engage in group activities, or use our comment feature to foster meaningful connections and supportive relationships with like-minded individuals on similar journeys.</p>
    `,
    },
    {
      question: "Is AlterBuddy available in the app too?",
      answer: `
      <p>Yes, AlterBuddy is available as a mobile app for both iOS and Android devices. You can download the app for iOS <a href="your-ios-link">here</a> and for Android <a href="your-android-link">here</a> for better user interface and seamless services.</p>
    `,
    },
    {
      question: "Can you message other users privately on AlterBuddy?",
      answer: `
      <p>No. You cannot message other users privately. It is an anonymous app for peer-to-peer communication.</p>
    `,
    },
    {
      question:
        "How can I find relevant discussions and communities on AlterBuddy?",
      answer: `
      <p>On AlterBuddy, you can explore different topics using our search function. You can find interesting conversations and connect with like-minded individuals to engage in meaningful conversations.</p>
    `,
    },
    {
      question:
        "Is there a limit to the number of posts I can make on AlterBuddy?",
      answer: `
      <p>There is no limit to the number of posts you can make on AlterBuddy. We encourage you to share and engage with others as much as you feel comfortable.</p>
    `,
    },
    {
      question: "How can I engage with others' posts and provide support?",
      answer: `
      <p>To engage with others' posts and provide support on AlterBuddy, you can leave comments, offer words of encouragement, share your own experiences, and provide empathetic responses. By actively participating in discussions, you can create a supportive environment where individuals can feel heard, understood, and supported. Your engagement can make a meaningful difference in someone's journey and foster connections within the AlterBuddy community.</p>
    `,
    },
    {
      question: "Are there any age restrictions for using AlterBuddy?",
      answer: `
      <p>AlterBuddy is designed for adults aged 18 and above. We believe in providing a safe and mature environment for individuals to explore their mental health and personal growth journey.</p>
    `,
    },
    {
      question:
        "Is there a moderation team that ensures the safety of users on AlterBuddy?",
      answer: `
      <p>Yes, AlterBuddy has a dedicated moderation team that monitors discussions, enforces community guidelines, and ensures the safety and well-being of all users. If you encounter any issues, you can report them to our moderation team for prompt action.</p>
    `,
    },
    {
      question: "Does AlterBuddy offer self-help books?",
      answer: `
      <p>AlterBuddy offers a collection of self-help books to complement your journey, providing valuable resources for personal growth, healing, and empowerment.</p>
    `,
    },
  ],
  howWeWish: {
    conclusion:
      "With our services,we help you manifest and attract the right energies towards you, with the right mindset.",
    conclusionTitle: "And what if I say that any or all of these are possible?",
    mainTitle:
      "There would come a Genie, who would come out of a lamp and say:",
    points: [
      "You will have the most loving soulmate in the entire universe.",
      "You will have the person you crave for, chase you like crazy.",
      "You will attract plenty of money.",
      "You will have the most awesome career.",
      "You will reach ladders of success like nobody else.",
      "You will live the healthiest Life.",
      "You will have the looks of an angel.",
      "You will live a life of contentment and satisfaction.",
    ],
  },
  pageContent: [
    {
      pageTitle: "Mental Health",
      path: "mental-health",
    },
    {
      pageTitle: "manifestation",
      path: "manifestation",
    },
    {
      pageTitle: "healing",
      path: "healing",
    },
    {
      pageTitle: "Rant (VENT IT OUT)",
      path: "rant",
    },
  ],
};

const ServicesSlice = createSlice({
  initialState,
  name: "services",
  reducers: {},
});

export const useServicesSlice = () =>
  useSelector((state: RootState) => {
    return state.services;
  });
export const ServicesReducer = ServicesSlice.reducer;
