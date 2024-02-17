import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const RoomPage = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appID = 872182407;
    const serverSecret = "2b643c14c03939613eacf48f8e3983d3";
    const kitTocken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Nutan"
    );
    const zc = ZegoUIKitPrebuilt.create(kitTocken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `https://localhost:5173/room/${roomId}`,
        //   url: "https://localhost:5173/room",
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
    });
  };
  return (
    <div>
      <div ref={myMeeting}></div>
    </div>
  );
};

export default RoomPage;