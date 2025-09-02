import React, { FC, useEffect } from "react";
import { BiCertification } from "react-icons/bi";
import { AppButton } from "../../UI";
import { useNavigate } from "react-router-dom";
import { useLazyGetSlotsByMentorIdQuery } from "../../../redux/rtk-api";

interface MentorCardProps {
     fname: string;
     lname: string;
     specialist: string[];
     image: string;
     expertise: string;
     id: string;
     description: string;
     latestSlot?: string;
     languages?: string;
     verified?: boolean;
}

export const MentorCard: FC<MentorCardProps> = ({
     fname,
     image,
     lname,
     expertise,
     latestSlot,
     id,
}) => {
     const navigate = useNavigate();

     const [GetMentorSlots, { data: slotData }] =
          useLazyGetSlotsByMentorIdQuery();
     useEffect(() => {
          if (!slotData) {
               (async () => {
                    await GetMentorSlots(id);
               })();
          }
     }, [slotData, GetMentorSlots, id]);
     return (
          <div className="p-3 rounded-lg bg-white shadow-primary-100 shadow-xl border">
               <div className="flex items-center gap-3 justify-between">
                    <div className="flex  xl:lg:md:flex-row flex-col xl:lg:md:items-center gap-3">
                         <div className="object-cover xl:lg:md:w-[35%]">
                              <img
                                   src={image}
                                   alt={fname + lname}
                                   className="rounded-lg xl:md:lg:h-auto sm:h-[250px] xl:md:lg:w-[200px] xl:lg:md:object-cover xl:lg:md:aspect-square xl:lg:md:object-center"
                              />
                         </div>
                         <div className="flex-1">
                              <p className="text-xl capitalize">
                                   {fname} {lname}
                              </p>
                         </div>
                    </div>
               </div>
               <div className="py-5 flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                         <BiCertification
                              size={24}
                              className="text-primary-500"
                         />
                         <p className="capitalize font-light">
                              Expert for{" "}
                              <span className="text-primary-500 capitalize">
                                   {expertise}
                              </span>
                         </p>
                    </div>
               </div>
               <hr className="border-t border-primary-500" />
               <div className="flex items-center mt-3 gap-3 w-full">
                    <AppButton
                         outlined
                         flexed
                         onClick={() => navigate(`/user/mentor/details/${id}`)}
                    >
                         <span className="text-sm">More details</span>
                    </AppButton>
                    <AppButton
                         filled
                         flexed
                         disabled={
                              slotData?.data.map((prop) => {
                                   return prop.mentorId === id;
                              })?.length
                                   ? false
                                   : true
                         }
                         onClick={() => navigate(`/user/mentor/details/${id}`)}
                    >
                         <p className="text-sm">
                              {!slotData?.data.map((prop) => {
                                   return prop.mentorId === id;
                              })?.length
                                   ? "Not available"
                                   : "Book Sessions"}
                         </p>
                    </AppButton>
               </div>
          </div>
     );
};
