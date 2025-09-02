import React, { FC, useEffect, useRef, useState } from "react";
import { Message } from "ably";
import { useChannel } from "ably/react";
import moment from "moment";
import clsx from "clsx";
import { IoMdAttach } from "react-icons/io";
import { AiOutlineMessage, AiOutlineSend } from "react-icons/ai";
import '../../../../app.css'
interface InsiderChatProps {
  channelName: string;
  myUsername: string;
  mentorCall?: boolean;
}

export const InsiderChat: FC<InsiderChatProps> = ({
  channelName,
  myUsername,
  mentorCall,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [uploadError, setUploadError] = useState<string>("");
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { channel } = useChannel(channelName);



  useEffect(() => {
    channel.subscribe((msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [channel, channelName, myUsername]);

  const sendMessage = async () => {
    if (input.trim() !== "") {
      await channel.publish({
        name: channelName,
        data: {
          username: myUsername,
          msg: input,
        },
      });
      setInput("");
    }
  };
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadError(""); // Clear previous errors
    
    if (!file) return;

    // Check file size (limit to 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setUploadError("File size must be less than 10MB");
      return;
    }
    
    // Check if it's an image file
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const allowedDocTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allAllowedTypes = [...allowedImageTypes, ...allowedDocTypes];
    
    if (!allAllowedTypes.includes(file.type)) {
      setUploadError("Only images (JPEG, PNG, GIF, WebP) and documents (PDF, TXT, DOC, DOCX) are allowed");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await channel.publish({
        name: channelName,
        data: {
          username: myUsername,
          fileName: file.name,
          fileType: file.type,
          fileData: reader.result, // base64 string
        },
      });
    };
    reader.readAsDataURL(file);
  };


  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  return (
    <div className=" relative h-full">
      <div className={clsx("flex flex-col w-full gap-3")}>
        <div
       
          className={clsx(
            "w-full flex flex-col gap-3 chat-bg rounded-lg p-2 overflow-y-scroll chat-scrollbar",
            !mentorCall ? " h-[73vh] " : "h-[73vh]",
            mentorCall && "mt-24"
          )}
        >
          {messages.length !== 0 &&
            messages.map(({ data, timestamp }, i) => (
              <div
                key={i}
                className={clsx(
                  "w-full flex flex-col gap-3",
                  data.username === myUsername ? "items-end" : "items-start"
                )}
              >
                <div
                  className={clsx(
                    data.username === myUsername
                      ? "bg-primary-500 text-right text-white justify-end"
                      : "bg-gray-100",
                    "px-2 py-3 rounded-lg w-[45%]"
                  )}
                >
                  <p className="capitalize text-sm">{data.username}</p>
                  <p className="text-lg">{data.msg}</p>
                  {data.fileData && (
                    <div className="mt-2">
                      {data.fileType.startsWith('image/') ? (
                        <img src={data.fileData} alt={data.fileName} className="max-w-full rounded-lg" />
                      ) : (
                        <a
                          href={data.fileData}
                          download={data.fileName}
                          className="text-primary-600 underline"
                        >
                          Download {data.fileName}
                        </a>
                      )}
                    </div>
                  )}
                  <p
                    className={clsx(
                      data.username === myUsername
                        ? "text-gray-300 text-sm text-left"
                        : "text-gray-500 text-right",
                      ""
                    )}
                  >
                    {moment(timestamp).fromNow()}
                  </p>
                </div>
              </div>
            ))}
          {messages.length === 0 && (
            <div
              className={clsx(
                "flex flex-col items-center justify-center",
                !mentorCall ? "h-[50vh]" : "h-[60vh]"
              )}
            >
              <AiOutlineMessage size={300} />
              <p className="text-xl text-gray-500 capitalize">
                start sending messages
              </p>
            </div>
          )}
          <div className="w-[97%] pl-3 pr-1 py-1 z-50 rounded-lg absolute bottom-0 shadow-xl bg-white border border-gray-200">
            {uploadError && (
              <div className="mb-2 p-2 bg-red-100 border border-red-300 text-red-700 rounded text-sm">
                {uploadError}
              </div>
            )}
            <div className="items-center gap-2 inline-flex justify-between">
              <div className="flex items-center gap-2 flex-1">
                <input
                  onKeyPress={(prop) => {
                    if (prop.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  className="grow shrink basis-0 w-full h-full py-2  text-black font-medium leading-4 focus:outline-none"
                  placeholder="Start sending messages..."
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 mr-2">
                <IoMdAttach size={25} onClick={() => fileInputRef.current?.click()} className="cursor-pointer" title="Attach file (Max 10MB)" />
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.txt,.doc,.docx"
                />
                <button
                  onClick={sendMessage}
                  className="items-center flex gap-5 p-2 text-white bg-primary-600 rounded-lg"
                >
                  <AiOutlineSend size={26} />
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1 px-2 pb-1">
              Supported files: Images (JPEG, PNG, GIF, WebP), Documents (PDF, TXT, DOC, DOCX) • Max size: 10MB
            </div>
          </div>
          <div ref={messageEndRef} />
        </div>
      </div>
    </div>
  );
};
