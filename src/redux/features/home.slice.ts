import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

interface HomeSliceProps {
  problems: {
    id: number;
    age: string;
    points: {
      issue: string;
      explanation: string;
      subPoints?: string[];
    }[];
  }[];
  helpPoints: {
    body: string;
    image: string;
    label: string;
    path: string;
  }[];
  selectedAgeGroup: number;
}

const initialState: HomeSliceProps = {
  problems: [
    {
      id: 0,
      age: "18-25",
      points: [
        {
          subPoints: [],
          issue: "Does the person you admire seem unaware?",
          explanation: "They don't notice your admiration.",
        },
        {
          issue: "Do your feelings get unreciprocated?",
          explanation: "Your emotions aren't returned.",
          subPoints: [],
        },
        {
          issue: "Relationship Issues",
          explanation: "Problems in personal relationships.",
          subPoints: [],
        },
        {
          issue: "Academic pressure or exam stress",
          explanation: "Stress from school or exams.",
          subPoints: [],
        },
        {
          issue: "Social anxiety",
          explanation: "Fear of social interactions.",
          subPoints: [],
        },
        {
          issue: "Peer pressure",
          explanation: "Influence from peers.",
          subPoints: [],
        },

        {
          issue: "Identity and confidence issues",
          explanation: "Struggling with self-identity and confidence.",
          subPoints: [],
        },
        {
          issue: "Body Shaming/ Self Image",
          explanation: "Criticism of your appearance.",
          subPoints: [],
        },
        {
          issue: "Bullying",
          explanation: "Harassment or intimidation.",
          subPoints: [],
        },
        {
          issue: "Family Conflicts",
          explanation: "Disagreements within the family.",
          subPoints: [],
        },
        {
          issue: "Break-up Trauma",
          explanation: "Emotional pain from a breakup.",
          subPoints: [],
        },
        {
          issue: "Uncertainty about your career choices",
          explanation: "Unsure about career decisions.",
          subPoints: [],
        },
        {
          issue: "Substance abuse",
          explanation: "Misuse of drugs or alcohol.",
          subPoints: [],
        },
        {
          issue: "Addiction of any sort",
          explanation: "Dependency on substances or behaviors.",
          subPoints: [],
        },
        {
          issue: "Facing Issues In Coping with transitions such as :",
          explanation: "Struggling with major life changes.",
          subPoints: ["Moving away from home", "Starting college"],
        },
      ],
    },
    {
      id: 1,
      age: "25-50",
      points: [
        {
          issue: "Rejection in marriage or love",
          explanation: "Being turned down in romantic relationships.",
        },
        {
          issue: "In love with someone who doesn’t want you",
          explanation: "Loving someone who doesn’t reciprocate your feelings.",
        },
        {
          issue: "Work stress and burnout",
          explanation: "Overwhelmed and exhausted from job demands.",
        },
        {
          issue: "Stress at Home",
          explanation: "Tension and anxiety from household matters.",
        },
        { issue: "Loneliness", explanation: "Feeling isolated and alone." },
        {
          issue: "Issues on Being Single",
          explanation: "Struggles related to not having a partner.",
        },
        {
          issue: "Societal Pressure",
          explanation: "Expectations and norms imposed by society.",
        },
        {
          issue: "Pressure of Work-Life Balance",
          explanation: "Difficulty managing job and personal life.",
        },
        {
          issue: "Marital problems or divorce",
          explanation: "Conflicts in marriage or dealing with separation.",
        },
        {
          issue: "Issues of not being able to have a child",
          explanation: "Struggles with infertility.",
        },
        {
          issue: "Financial stress and managing debt",
          explanation: "Anxiety over money and debts.",
        },
        {
          issue: "Existential questions about your life’s purpose",
          explanation: "Uncertainty about the meaning of life.",
        },
        {
          issue: "Coping with aging parents",
          explanation: "Challenges of caring for elderly parents.",
        },
        {
          issue: "Health concerns",
          explanation: "Worries about physical well-being.",
        },
        {
          issue: "Issues of Spouse and Parents not getting along",
          explanation: "Conflicts between your spouse and your parents.",
        },
        {
          issue: "Career Problems",
          explanation: "Difficulties and dissatisfaction in your job.",
        },
        {
          issue: "Feeling stuck or unfulfilled in life",
          explanation: "Lacking direction or satisfaction in life.",
        },
        {
          issue: "Dealing with children leaving home",
          explanation: "Adjusting to an empty nest.",
        },
        {
          issue:
            "Want to leave 9-5 and start your own business but don't know how to get started",
          explanation:
            "Uncertainty about transitioning from a traditional job to entrepreneurship.",
        },
      ],
    },
    {
      id: 2,
      age: "above 50",
      points: [
        {
          issue: "Has problems in adjusting to retirement",
          explanation: "Difficulty transitioning from work to retirement.",
        },
        {
          issue:
            "Is facing loneliness, especially after the loss of loved ones",
          explanation: "Feeling alone, particularly after losing close ones.",
        },
        {
          issue: "Has health concerns",
          explanation: "Worries about physical well-being.",
        },
        {
          issue:
            "Has problems in coping with age-related changes and limitations",
          explanation: "Struggling with changes and limitations due to aging.",
        },
        {
          issue: "Is dealing with regrets or unresolved issues from the past",
          explanation: "Struggles with past mistakes or unresolved matters.",
        },
        {
          issue: "Has problems maintaining mental sharpness",
          explanation: "Difficulty keeping cognitive abilities sharp.",
        },
        {
          issue: "Is facing financial worries",
          explanation: "Concerns about money and financial stability.",
        },
        {
          issue: "Is finding purpose and meaning in life",
          explanation: "Seeking a sense of purpose and meaning.",
        },
      ],
    },
  ],
  helpPoints: [
    {
      body: "Our psychologists (your buddies) help you overcome anxiety, stress, and confusion. they will help you gain clarity and confidence in your life's direction.",
      image: require("../../assets/image/image3.jpg"),
      label: "mental health",
      path: "/services/mental-health",
    },
    {
      body: "Our coaches will guide you in manifesting your desires for love, relationships, success, money, and good health, helping you transform your reality and create the life always desired.",
      image: require("../../assets/image/image2.jpg"),
      label: "manifestation",
      path: "/services/manifestation",
    },
    {
      body: "Our compassionate healers offer emotional and spiritual healing to help you heal past traumas, find inner peace, and rediscover balance and harmony in your life..",
      image: require("../../assets/image/image1.jpg"),
      label: "healing",
      path: "/services/healing",
    },
    {
      body: "Feeling overwhelmed? just vent it out. we are here to listen. our rant-out buddies provide a safe space for you to vent your frustrations and emotions without fear of judgment.",
      image: require("../../assets/image/image7.jpeg"),
      label: "rant (vent out) services",
      path: "/services/rant",
    },
  ],
  selectedAgeGroup: 0,
};

const HomeSlice = createSlice({
  initialState,
  name: "home",
  reducers: {
    handleAgeGroupSelection: (state, action: PayloadAction<number>) => {
      state.selectedAgeGroup = action.payload;
    },
  },
});

export const HomeReducer = HomeSlice.reducer;
export const useHomeSlice = () =>
  useSelector((state: RootState) => {
    return state.home;
  });
export const { handleAgeGroupSelection } = HomeSlice.actions;
