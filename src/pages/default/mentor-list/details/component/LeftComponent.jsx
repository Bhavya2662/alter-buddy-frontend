// LeftComponent.jsx - combines profile, about, video, services, and specialists in one

import React from "react";
import DOMPurify from "dompurify";
import moment from "moment";
import { MdOutlineFormatQuote } from "react-icons/md";

const LeftComponent = ({ mentor, packages }) => {
  const cleanHTML = DOMPurify.sanitize(mentor?.description);

  return (
    <div className="xl:lg:md:flex-1">
      <div className="flex gap-10 items-center">
        <img
          src={
            mentor?.image ||
            "https://qph.cf2.quoracdn.net/main-qimg-5b495cdeb2ebb79cff41634e5f9ea076"
          }
          alt="mentor"
          className="object-cover aspect-square w-[20%] rounded-md p-2 shadow-lg"
        />
        <div className="flex items-start flex-col">
          <h6 className="text-3xl capitalize">
            {mentor?.name?.firstName} {mentor?.name?.lastName}
          </h6>
          <p className="capitalize text-primary-500 text-lg mt-2">
            {mentor?.category?.map((c) => c.title).join(", ")}
          </p>
          <p className="capitalize text-primary-500 text-md mt-2">
            Qualification : {mentor?.qualification || "N/A"}
          </p>
          <div className="flex mt-3 gap-3 items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/484/484633.png"
              alt="lang"
              width={20}
            />
            <p className="capitalize text-gray-900 mt-2">
              {mentor?.languages?.join(", ")}
            </p>
          </div>
        </div>
      </div>
      <hr className="my-10" />

      <div className="flex flex-col gap-5">
        <div>
          <h6 className="text-2xl flex-wrap font-libre capitalize text-primary-500">
            About
          </h6>
          <div
            className="no-tailwind"
            style={{ all: "unset", display: "block", fontFamily: "inherit" }}
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
          />
        </div>

        {mentor?.videoLink && (
          <div className="my-10">
            <video
              className="xl:lg:md:w-full aspect-video"
              src={mentor?.videoLink}
              title="Mentor introduction video"
              controls
              controlsList="nodownload nofullscreen noremoteplayback"
            />
          </div>
        )}

        {packages?.length > 0 && (
          <div>
            {packages.map((pkg, i) => (
              pkg?.subServices?.length > 0 && (
                <div key={i} className="space-y-4">
                  <h6 className="text-2xl flex-wrap font-libre capitalize text-primary-500">
                    {pkg?.categoryId?.title} Service List
                  </h6>
                  <table>
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-5 py-2 w-[40%] border-r-2 text-left">Name</th>
                        <th className="px-5 py-2 w-[20%] text-left">Time</th>
                        <th className="px-5 py-2 w-[20%] text-right">BuddyCoins</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pkg?.subServices?.map((sub, j) => (
                        <tr key={j} className="border-b border-x">
                          <td className="px-5 py-2">
                            <p className="capitalize">{sub.title}</p>
                          </td>
                          <td className="px-5 py-2">
                            <p className="capitalize">{sub.time || "N/A"}</p>
                          </td>
                          <td className="px-5 py-2 text-right">{sub.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ))}

            {packages.some(pkg => pkg.subServices?.length > 0) && (
              <div>
                <h6 className="text-lg font-bold text-primary-500 uppercase">note :</h6>
                <p>
                  Please note that the rates mentioned above are for <b>readings and consultations only</b>. These charges apply to sessions where the healer assesses your current emotional, spiritual, or physical state and offers guidance on their findings.
                </p>
                <p className="mt-3">
                  Healing services, which may be recommended after the consultation, are <b>customized specifically</b> to meet your individual needs and are <b>separately charged</b>. The healer will discuss the best healing methods during your consultation, and together you can decide the next steps.
                </p>
              </div>
            )}
          </div>
        )}

        {mentor?.specialists?.length > 0 && (
          <div className="bg-primary-100 p-3 rounded-md">
            <h6 className="text-xl font-sans2 mb-2 capitalize text-primary-500">
              What can you ask me:
            </h6>
            {mentor?.specialists.map((item, idx) => (
              <div key={idx} className="flex items-end gap-3">
                <MdOutlineFormatQuote size={30} className="fill-primary-500" />
                <p className="text-md text-gray-500 capitalize">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftComponent;
