import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useVoiceflow from "@/hooks/useVoiceflow";
import { toast } from "react-toastify";
import TypingMessage from "../TypingMessage/TypingMessage";
//images
import smile from "@images/icons/smile.svg";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import send from "@images/icons/send.svg";

type Emoji = {
  native: string;
};

const Chat: React.FC = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const smileRef = useRef<HTMLImageElement>(null);

  const [message, setMessage] = useState("");
  const [isShowEmoji, setIsShowEmoji] = useState(false);
  const { flow, isLoading, handleSend, handleLaunch } = useVoiceflow();

  const handleAddEmoji = ({ native }: Emoji) => {
    setMessage((inputValue) => inputValue + native);
  };

  const handleShowEmoji = () => {
    setIsShowEmoji((prev) => !prev);
  };

  const handleScrollToBottom = () => {
    setTimeout(() => {
      chatRef.current &&
        (chatRef.current.scrollTop = chatRef.current?.scrollHeight);
    }, 100);
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      handleSend(message);
      setMessage("");
    } else {
      toast("Message cannot be empty", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSendMessageByEnterClick = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.code === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    handleScrollToBottom();
    handleLaunch();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleScrollToBottom();
  }, [flow]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        emojiRef.current &&
        !emojiRef?.current?.children[0]?.contains(event.target) &&
        smileRef.current &&
        !smileRef?.current?.contains(event.target)
      ) {
        setIsShowEmoji((prev) => !prev);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-chat bg-no-repeat bg-cover min-h-chat-h flex flex-col justify-between p-[13px] pt-0 pb-[14px]">
      <div
        className="no-scrollbar overflow-y-scroll grow max-h-messages-h flex flex-col gap-[23px] first:mt-[13px] pb-[15px]"
        ref={chatRef}
      >
        {flow?.map((item, index) => {
          if (item.reply) {
            return (
              <div
                className=" rounded-reseived text-black bg-[#defcfc] mr-auto  max-w-[70%] font-inter text-[18px] font-normal py-[10px] px-[20px]"
                key={index}
              >
                {item.message}
              </div>
            );
          } else {
            return (
              <div
                className=" rounded-send text-[#fff] bg-[#3531fd] ml-auto  max-w-[70%] font-inter text-[18px] font-normal py-[10px] px-[20px]"
                key={index}
              >
                {item.message}
              </div>
            );
          }
        })}
        {isLoading && (
          <div className=" rounded-reseived text-black bg-[#defcfc] mr-auto  max-w-[70%] font-inter text-[18px] font-normal py-[10px] px-[20px]">
            <TypingMessage />
          </div>
        )}
      </div>
      <div className="w-full flex justify-between items-center gap-1">
        <div className="w-full flex justify-between items-center gap-2 py-[16px] pr-[10px] pl-[8px] rounded-[17px] bg-[#f6f6f6] shadow-input-shadow">
          <Image
            src={smile}
            ref={smileRef}
            width={28}
            height={28}
            alt="smile"
            className="cursor-pointer hidden md:block"
            onClick={handleShowEmoji}
          />
          {isShowEmoji && (
            <div className="absolute bottom-36" ref={emojiRef}>
              <Picker
                data={data}
                onEmojiSelect={handleAddEmoji}
                theme={"light"}
              />
            </div>
          )}
          <input
            className="border-none w-full h-auto bg-[#f6f6f6] text-black font-inter text-base tracking-wider font-medium mb-1 focus:outline-none"
            placeholder="Chiedimi ciò che vuoi..."
            type="text"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleSendMessageByEnterClick}
          />
          {/* <Image src={select_file} width={26} height={26} alt="select_file" /> */}
        </div>
        <Image
          className=" cursor-pointer"
          src={send}
          width={46}
          height={42}
          alt="send"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
