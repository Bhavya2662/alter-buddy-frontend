import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

export interface FaqSliceProps {
  active: number | null;
  data: {
    label: string;
    body: string;
  }[];
}

const initialState: FaqSliceProps = {
  active: 0,
  data: [
    {
      label: "What is an FAQ section?",
      body: "An FAQ section can be used to quickly answer common questions about your 'business like Where do you ship to?', What are your opening hours?', or 'How can I book a service?' ",
    },
    {
      label: "Why do FAQs matter?",
      body: "FAQs are a great way to help site visitors find quick answers to common questions about your business and create a better navigation experience.",
    },
    {
      label: "Where can I add my FAQs?",
      body: "FAQs can be added to any page on your site or to your Wix mobile app, giving access to members on the go.               ",
    },
    {
      label: "How do I add a new question & answer?",
      body: "FAQs can be added to any page on your site or to your Wix mobile app, giving access to members on the go.               ",
    },
    {
      label: "What is an FAQ section?",
      body: "An FAQ section can be used to quickly answer common questions about your 'business like Where do you ship to?', What are your opening hours?', or 'How can I book a service?' ",
    },
    {
      label: "Why do FAQs matter?",
      body: "FAQs are a great way to help site visitors find quick answers to common questions about your business and create a better navigation experience.",
    },
    {
      label: "Where can I add my FAQs?",
      body: "FAQs can be added to any page on your site or to your Wix mobile app, giving access to members on the go.               ",
    },
    {
      label: "How do I add a new question & answer?",
      body: "FAQs can be added to any page on your site or to your Wix mobile app, giving access to members on the go.               ",
    },
  ],
};

const FaqsSlice = createSlice({
  initialState,
  name: "faq",
  reducers: {
    handleFaq: (state, action: PayloadAction<number | null>) => {
      if (state.active === action.payload) {
        state.active = null;
      } else {
        state.active = action.payload as number;
      }
    },
  },
});

export const useFaqSlice = () =>
  useSelector((state: RootState) => {
    return state.faq;
  });
export const FaqReducer = FaqsSlice.reducer;
export const { handleFaq } = FaqsSlice.actions;
