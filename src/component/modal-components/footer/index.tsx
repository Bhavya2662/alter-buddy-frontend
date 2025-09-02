import React, { FC } from "react";

export const AuthModalFooter: FC = () => {
     return (
          <div className="flex flex-col justify-center items-center">
               <p className="font-extralight text-center mt-5">
                    Your profile will be set to public automatically when you sign up. You can change this later in your
                    profile settings.
               </p>
          </div>
     );
};
