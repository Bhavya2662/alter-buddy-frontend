import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const UserPrivateRoutes = () => {
     if (localStorage.getItem("USER_TOKEN")) {
          return <Outlet />;
     } else {
          return <Navigate to="/" replace />;
     }
     // return localStorage.getItem("USER_TOKEN") ? <Outlet /> : <Navigate to="/" replace />;
};

const MentorPrivateRoutes = () => {
     return localStorage.getItem("MENTOR_TOKEN") ? <Outlet /> : <Navigate to="/" replace />;
};

export { UserPrivateRoutes, MentorPrivateRoutes };
