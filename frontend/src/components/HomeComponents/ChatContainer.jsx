import React, { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { Loader, Send } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MsgInput from "./MsgInput";
import MsgSkeleton from "./MsgSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import userAvatar from "../../assets/images/user.png";
import { formatMessageTime } from "../../lib/utils";

function ChatContainer() {
  const { messages, getMsg, isMsgLoading, selectedUser, listenToMsg, notListenToMsg } = useChatStore();
  const { authUser } = useAuthStore();

  const msgEndRef = useRef(null);

  useEffect(() => {
    getMsg(selectedUser._id);

    listenToMsg();

    return () => notListenToMsg();
  }, [selectedUser._id, getMsg, listenToMsg, notListenToMsg]);

  useEffect(() => {
    if(msgEndRef.current && messages)
    msgEndRef.current.scrollIntoView({behavior:"smooth"})
  }, [messages])


  if (isMsgLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MsgSkeleton />
        <MsgInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto px-8">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${
              msg.senderId === authUser._id ? "chat-end" : "chat-start"
            }`} ref={msgEndRef}
          >
            {/* Avatar */}
            <div className="chat-image">
              <div className="avatar w-10 h-10">
                <img
                  src={
                    msg.senderId === authUser._id
                      ? authUser.profilePic || userAvatar
                      : selectedUser.profilePic || userAvatar
                  }
                  alt="profile pic"
                  className="rounded-full border border-base-300"
                />
              </div>
            </div>

            {/* Message Bubble */}
            <div className={`chat-bubble  text-base-content max-w-[75%] p-4 rounded-xl flex flex-row items-end gap-8 ${
              msg.senderId === authUser._id ? "bg-primary text-primary-content" : "bg-base-200"
            } `}>
            <div>
              {/* Image */}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Msg Image"
                  className="max-w-[200px] rounded-md mb-2"
                />
              )}
              {/* Text */}
              {msg.text && <p>{msg.text}</p>}
              </div>
              {/* Time */}
             <time className="text-xs italic text-gray-500 mt-1 block text-end">
                {formatMessageTime(msg.createdAt)}
              </time>
            </div>

          </div>

        ))}
      </div>
      <MsgInput />
    </div>
  );
}

export default ChatContainer;
