import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  AllMentorsPage,
  ComingSoonPage,
  MentorLoginPage,
  MobileVerificationPage,
  UserProfilePage,
  MentorDashboardPage,
  UserMentorDetailsPage,
  MentorSettingsPage,
  MentorPasswordPage,
  MentorPaymentHistoryPage,
  MentorSessionPackagePage,
  MentorGroupSessionPage,

  // BuddyTubePage,
  TeamPage,
  // MentalHealthPage,
  // ManifestationPage,
  // HealingPage,
  // RantPage,
  MentorCallHistoryPage,
  SchedulesMentorPage,
  UserPaymentStatus,
  SignInPage,
  SignUpPage,
  MentorRantPage,
  PackagesPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  UserChatPage,
  MentorChatPage,
  CallPage,
  ManifestationPage,
  BuddyTubePage,
  BlogDetailPage,
  BlogCreatePage,
} from "../views";
import Home from "../views/default/home";
import AboutUs from "../views/default/about";
import FAQs from "../views/default/faqs";
import ContactUs from "../views/default/contact";
import TermsAndCondition from "../views/default/terms-and-condition";
import PrivacyPolicy from "../views/default/privacy-policy";
import { MentorPrivateRoutes, UserPrivateRoutes } from "../component";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import ScrollToTop from "../views/scrollToTop"

import MentalHealthMain from "../views/default/services/mental-health";
import RantVantOut from "../views/default/services/rant-vant-out";
import Manifest from "../views/default/services/manifestation";
import DatingRelationship from "../views/default/services/dating-relationship";
import Healing from "../views/default/services/healing";
import EnergyWork from "../views/default/services/energy-work";
import EnergyHealPets from "../views/default/services/energy-healing-pets";
import RefundPolicy from "../views/default/refund-policy";
import ShippingPolicy from "../views/default/shipping-policy";
import BuddyTube from "../views/default/buddytube";
import TripartiteService from "../views/default/tripartite";
import CareersPage from "../views/default/careers";
import GroupSessionsPage from "../views/default/group-sessions";
import { AnonymousRantPage } from "../views/default/anonymous-rant";
const hideLayoutRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/mobile-verification",
  "/coming-soon",
  "/mentor/login",
  "/mentor/sign-in",
  "/mentor/dashboard",
  "/mentor/chat/messages",
  "/mentor/call-history",
  "/mentor/schedules",
  "/mentor/settings",
  "/mentor/rant",
  "/mentor/packages",
  "/mentor/change-password",
  "/mentor/payment-history",
  "/mentor/session-package",
  "/mentor/group-session",
];
const hideLayoutRoutes1 = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/mobile-verification",
  "/coming-soon",
  "/mentor/login",
  "/mentor/sign-in",
  "/mentor/dashboard",
  "/mentor/chat/messages",
  "/mentor/call-history",
  "/mentor/schedules",
  "/mentor/settings",
  "/mentor/payment-history",
  "/mentor/rant",
  "/mentor/packages",
  "/user/chat",
  "/mentor/change-password",
  "/mentor/session-package",
  "/mentor/group-session",
];

export const AppRoutes = () => {
  const location = useLocation();
  
  // const hideRoutes = ['/doctor', '/lab','/', "/forget-password", "/reset-password",'/clinic'].some(route => location.pathname.includes(route));
  const shouldHideLayout = hideLayoutRoutes.some(route => location.pathname.includes(route));
  const shouldHideFooter = hideLayoutRoutes1.some(route => location.pathname.includes(route));
  // const shouldHideLayout = hideLayoutRoutes.includes(location.pathname) || dynamicHiddenRoutes.some(route => route.test(location.pathname));

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/buddytube" element={<BuddyTube />} />
        <Route path="/blogs" element={<BuddyTubePage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/blog-create" element={<BlogCreatePage />} />
        <Route path="/blog-edit/:id" element={<BlogCreatePage />} />
        <Route path="/careers" element={<CareersPage />} />

        <Route path="services">
          <Route path="mental-health" element={<MentalHealthMain />} />
          <Route path="rant" element={<RantVantOut />} />
          <Route path="manifestation" element={<Manifest />} />
          <Route path="dating-relationship" element={<DatingRelationship />} />
          <Route path="healing" element={<Healing />} />
          <Route path="energy-work" element={<EnergyWork />} />
          <Route path="energy-pets" element={<EnergyHealPets />} />
        </Route>
        
        <Route path="/anonymous-rant" element={<AnonymousRantPage />} />

        <Route path="/terms-and-condition" element={<TermsAndCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/tripartite-service" element={<TripartiteService />} />
        <Route path="/group-sessions" element={<GroupSessionsPage />} />

     

      
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/our-team" element={<TeamPage />} />
        {/* <Route path="/buddytube" element={<BuddyTubePage />} /> */}
        {/* <Route path="services">
                    <Route
                         path="mental-health"
                         element={<MentalHealthPage />}
                    />
                    <Route
                         path="manifestation"
                         element={<ManifestationPage />}
                    />
                    <Route path="healing" element={<HealingPage />} />
                    <Route path="rant" element={<RantPage />} />
               </Route> */}
        <Route path="/mentor/list" element={<AllMentorsPage />} />
        {/* <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> */}
        {/* <Route
                    path="/terms-and-condition"
                    element={<TermsAndConditionPage />}
               /> */}
        <Route path="/mentor/category/:id" element={<AllMentorsPage />} />
        <Route
          path="/mobile-verification"
          element={<MobileVerificationPage />}
        />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/call" element={<CallPage />} />
         <Route
              path="user/mentor/details/:id"
              element={<UserMentorDetailsPage />}
            />
        <Route path="user">
          <Route element={<UserPrivateRoutes />}>
           
            <Route path="chat/:id/:roomId" element={<UserChatPage />} />
            {/* <Route path="buddytube" element={<BuddyTubePage />} /> */}
            <Route path="my-profile" element={<UserProfilePage />} />
            <Route path="payment" element={<UserPaymentStatus />} />
          </Route>
        </Route>
        <Route path="/mentor/login" element={<MentorLoginPage />} />
        <Route path="/mentor/sign-in" element={<MentorLoginPage />} />
        <Route path="mentor">
          <Route element={<MentorPrivateRoutes />}>
            <Route path="dashboard" element={<MentorDashboardPage />} />
            <Route path="chat/messages" element={<MentorChatPage />} />
            <Route path="call-history" element={<MentorCallHistoryPage />} />
            <Route path="payment-history" element={<MentorPaymentHistoryPage />} />
            <Route path="session-package" element={<MentorSessionPackagePage />} />
            <Route path="group-session" element={<MentorGroupSessionPage />} />
            <Route path="schedules" element={<SchedulesMentorPage />} />
            <Route path="settings" element={<MentorSettingsPage />} />
            <Route path="change-password" element={<MentorPasswordPage />} />
            <Route path="rant" element={<MentorRantPage />} />
            <Route path="packages" element={<PackagesPage />} />
          </Route>
        </Route>
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
};
