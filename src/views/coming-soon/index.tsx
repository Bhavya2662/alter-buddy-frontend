import React from "react";
import { MainLayout } from "../../layout";
import { Link } from "react-router-dom";

export const ComingSoonPage = () => {
     return (
          <MainLayout hideNav>
               <div className="h-screen flex justify-center flex-col items-center">
                    <h1 className="text-4xl text-primary-500">This page is under development</h1>
                    <p>
                         This page is not found or it is in development! that's why this error is displaying! click here
                         to go{" "}
                         <Link to="/" className="underline">
                              back to home page
                         </Link>
                    </p>
               </div>
          </MainLayout>
     );
};
