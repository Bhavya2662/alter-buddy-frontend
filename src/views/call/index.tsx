import { HMSKrispPlugin } from "@100mslive/hms-noise-cancellation";
import {
     HMSRoomProvider,
     selectIsConnectedToRoom,
     useHMSActions,
     useHMSStore,
     selectRoomState,
     HMSRoomState,
     useVideo,
     selectIsPeerVideoEnabled,
     selectPeers,
     selectPeersScreenSharing,
     selectScreenShareByPeerID,
     useAVToggle,
     selectIsLocalScreenShared,
     selectRoom,
     selectIsLocalAudioPluginPresent,
} from "@100mslive/react-sdk";
import { HMSThemeProvider } from "@100mslive/roomkit-react";
import { useEffect, useState } from "react";
import {
     AiOutlineArrowRight,
     AiOutlineClose,
     AiOutlineUser,
} from "react-icons/ai";
import { FiCamera, FiCameraOff } from "react-icons/fi";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import {
     MdOutlineSpatialAudioOff,
     MdOutlineStopScreenShare,
     MdScreenSearchDesktop,
} from "react-icons/md";
import { AlterBuddyLogo } from "../../assets/logo";
import { AppButton, TextField } from "../../component";
import clsx from "clsx";
import { MainLayout } from "../../layout";

export const CallPage = () => {
     return (
          <HMSRoomProvider>
               <HMSThemeProvider>
                    <CallRoom />
               </HMSThemeProvider>
          </HMSRoomProvider>
     );
};

const loadingStates = [HMSRoomState.Connecting, HMSRoomState.Disconnecting];

const CallRoom = () => {
     const isConnected = useHMSStore(selectIsConnectedToRoom);
     const roomState = useHMSStore(selectRoomState);
     const hmsActions = useHMSActions();

     useEffect(() => {
          window.onunload = () => {
               if (isConnected) {
                    hmsActions.leave();
               }
          };
     }, [hmsActions, isConnected]);

     if (loadingStates.includes(roomState) || !roomState) {
          return <div>Loading</div>;
     }

     return (
          <div className="font-libre">
               {isConnected ? (
                    <div className="h-screen flex flex-col justify-between">
                         <Header />
                         <Conference />
                         <Footer />
                    </div>
               ) : (
                    <JoinForm />
               )}
          </div>
     );
};

function Header() {
     const isConnected = useHMSStore(selectIsConnectedToRoom);
     const hmsActions = useHMSActions();

     return (
          <header className="flex items-center justify-between bg-gray-950 py-3 px-2">
               <AlterBuddyLogo />
               {isConnected && (
                    <AppButton
                         type="button"
                         onClick={() => hmsActions.leave()}
                         outlined
                    >
                         <AiOutlineClose /> Leave
                    </AppButton>
               )}
          </header>
     );
}

function Conference() {
     const peers = useHMSStore(selectPeers);
     const presenters = useHMSStore(selectPeersScreenSharing);

     return (
          <div className="conference-section">
               <div className="peers-container px-2">
                    {presenters.length === 0 && (
                         <div className="flex gap-5">
                              {peers.length !== 0 &&
                                   peers
                                        .map((peer) => (
                                             <Peer key={peer.id} peer={peer} />
                                        ))
                                        .reverse()}
                         </div>
                    )}
                    <div className="p-10">
                         {presenters.length !== 0 &&
                              presenters.map((peer) => (
                                   <ScreenTile
                                        key={"screen" + peer.id}
                                        peer={peer}
                                   />
                              ))}
                    </div>
               </div>
          </div>
     );
}

function Peer({ peer }) {
     const { videoRef } = useVideo({
          trackId: peer.videoTrack,
     });

     const isPeerVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));

     return (
          <div className="flex flex-col items-end justify-end w-full  ">
               {isPeerVideoEnabled && (
                    <video
                         ref={videoRef}
                         className={clsx(
                              `${peer.isLocal ? "w-[50%]" : "w-[100%]"}`
                         )}
                         autoPlay
                         muted
                         playsInline
                    />
               )}
               {!isPeerVideoEnabled ? (
                    <div
                         className={clsx(
                              "bg-gray-300 flex items-center justify-center h-[350px]",
                              peer.isLocal ? "w-[50%]" : "w-[100%]"
                         )}
                    >
                         <AiOutlineUser size={48} />
                    </div>
               ) : null}
               <div
                    className={clsx(`${peer.isLocal ? "w-[50%]" : "w-[100%]"}`)}
               >
                    {peer.name} {peer.isLocal ? "(You)" : ""}
               </div>
          </div>
     );
}

function JoinForm() {
     const hmsActions = useHMSActions();
     const [roomCode, setRoomCode] = useState<string>("");
     const [username, setUserName] = useState<string>("");

     const handleSubmit = async (e: any) => {
          e.preventDefault();
          // use room code to fetch auth token
          const authToken = await hmsActions.getAuthTokenByRoomCode({
               roomCode: roomCode,
          });
          console.log(authToken);

          try {
               await hmsActions.join({
                    userName: username,
                    authToken,
               });
          } catch (e) {
               console.error(e);
          }
     };

     return (
          <MainLayout>
               <div className="h-screen flex flex-col justify-center items-center">
                    <div className="shadow-lg w-[90%] xl:w-[50%] p-10 space-y-4 rounded border-2 border-primary-500">
                         <div>
                              <div className="flex items-center justify-between">
                                   <AlterBuddyLogo />
                                   <h2 className="text-xl">
                                        Accessing Your Room
                                   </h2>
                              </div>
                              <p className="text-gray-500">
                                   Look for a section in the email that mentions
                                   the room code. It might be highlighted or in
                                   a bold font.
                              </p>
                         </div>
                         <form onSubmit={handleSubmit} className="space-y-2">
                              <div className="input-container">
                                   <TextField
                                        outlined
                                        label="Room Code"
                                        value={roomCode}
                                        onChange={(prop) =>
                                             setRoomCode(prop.target.value)
                                        }
                                        id="room-code"
                                        type="text"
                                        name="roomCode"
                                        placeholder="Your Room Code"
                                   />
                              </div>
                              <div className="input-container">
                                   <TextField
                                        label="Enter Your Name"
                                        outlined
                                        value={username}
                                        onChange={(prop) =>
                                             setUserName(prop.target.value)
                                        }
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                   />
                              </div>
                              <div className="flex justify-end">
                                   <AppButton outlined type="submit">
                                        Join Now
                                        <AiOutlineArrowRight
                                             height={16}
                                             width={16}
                                        />
                                   </AppButton>
                              </div>
                         </form>
                    </div>
               </div>
          </MainLayout>
     );
}

const ScreenTile = ({ peer }) => {
     const screenshareVideoTrack = useHMSStore(
          selectScreenShareByPeerID(peer.id)
     );
     const { videoRef } = useVideo({
          trackId: screenshareVideoTrack.id,
     });

     return (
          <div className="peer-container">
               <video
                    ref={videoRef}
                    className="peer-video"
                    autoPlay
                    muted
                    playsInline
               />
               <div className="peer-name">
                    Screen shared by {peer.name} {peer.isLocal ? "(You)" : ""}
               </div>
          </div>
     );
};

const plugin = new HMSKrispPlugin();

function Footer() {
     const {
          isLocalAudioEnabled,
          isLocalVideoEnabled,
          toggleAudio,
          toggleVideo,
     } = useAVToggle();
     const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);
     const actions = useHMSActions();
     const room = useHMSStore(selectRoom);
     const isAudioPluginAdded = useHMSStore(
          selectIsLocalAudioPluginPresent(plugin.getName())
     );
     const [isPluginActive, setIsPluginActive] = useState(false);

     return (
          <div className="control-bar flex items-center gap-10 px-2 py-3 bg-gray-950">
               <button
                    className={clsx(
                         isLocalAudioEnabled ? "bg-primary-500" : "bg-gray-950",
                         "p-3 text-white rounded-md"
                    )}
                    onClick={toggleAudio}
               >
                    {isLocalAudioEnabled ? (
                         <IoMdMic size={24} />
                    ) : (
                         <IoMdMicOff size={24} />
                    )}
               </button>
               <button
                    className={clsx(
                         isLocalVideoEnabled ? "bg-primary-500" : "bg-gray-950",
                         "p-3 text-white rounded-md"
                    )}
                    onClick={toggleVideo}
               >
                    {isLocalVideoEnabled ? (
                         <FiCamera size={24} />
                    ) : (
                         <FiCameraOff size={24} />
                    )}
               </button>
               <button
                    title="Screenshare"
                    className={clsx(
                         amIScreenSharing ? "bg-primary-500" : "bg-gray-950",
                         "p-3 text-white rounded-md"
                    )}
                    onClick={() =>
                         actions.setScreenShareEnabled(!amIScreenSharing)
                    }
               >
                    {amIScreenSharing ? (
                         <MdScreenSearchDesktop size={24} />
                    ) : (
                         <MdOutlineStopScreenShare size={24} />
                    )}
               </button>
               {room.isNoiseCancellationEnabled ? (
                    <button
                         title="Noise cancellation"
                         className={`btn-control ${
                              isPluginActive ? "" : "highlight"
                         }`}
                         onClick={async () => {
                              if (isAudioPluginAdded) {
                                   plugin.toggle();
                                   setIsPluginActive((prev) => !prev);
                              } else {
                                   await actions.addPluginToAudioTrack(plugin);
                                   setIsPluginActive(true);
                              }
                         }}
                    >
                         <MdOutlineSpatialAudioOff />
                    </button>
               ) : null}
          </div>
     );
}
