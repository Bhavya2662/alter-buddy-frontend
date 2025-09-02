import React from "react";
import {
  selectPeers,
  selectPeersScreenSharing,
  useHMSStore,
} from "@100mslive/react-sdk";
import { VideoCallPeer } from "../peer";
import { ScreenTile } from "../screen-tile";
import clsx from "clsx";

export const CallConference = () => {
  const peers = useHMSStore(selectPeers);
  const presenters = useHMSStore(selectPeersScreenSharing);

  return (
    <div className="grid grid-cols-12">
      {/* Render peers only if there are no presenters */}
      {presenters.length === 0
        ? peers.map((peer) => (
            <div
              key={peer.id} // Ensure the key is on the outermost element
              className={clsx(
                peer.isLocal
                  ? "absolute z-50 w-[300px] right-8 bottom-32" // Position for local peer
                  : "col-span-11" // Applies only for non-local peers
              )}
            >
              <VideoCallPeer {...peer} />
            </div>
          ))
        : null}

      {/* Render presenters regardless of the presence of peers */}
      <div className="col-span-12">
        {presenters.map((peer) => (
          <ScreenTile key={"screen" + peer.id} peer={peer} />
        ))}
      </div>
    </div>
  );
};
