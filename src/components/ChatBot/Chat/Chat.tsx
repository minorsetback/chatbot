import Image from "next/image";
import styles from "./Chat.module.scss";
//images
import smile from "@images/icons/smile.svg";
import select_file from "@images/icons/select_file.svg";
import send from "@images/icons/send.svg";
import { useEffect, useRef, useState } from "react";
import useVoiceflow from "@/hooks/useVoiceflow";
import { toast } from "react-toastify";
import TypingMessage from "../TypingMessage/TypingMessage";

const Chat: React.FC = () => {
  const chat = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState("");
  const { flow, isLoading, handleSend, handleLaunch } = useVoiceflow();

  const handleScrollToBottom = () => {
    setTimeout(() => {
      chat.current && (chat.current.scrollTop = chat.current?.scrollHeight);
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

  return (
    <div className={styles.chat}>
      <div className={styles.chat__messages} ref={chat}>
        {flow?.map((item, index) => {
          if (item.reply) {
            return (
              <div className={styles.chat__message_received} key={index}>
                {item.message}
              </div>
            );
          } else {
            return (
              <div className={styles.chat__message_sent} key={index}>
                {item.message}
              </div>
            );
          }
        })}
        {isLoading && (
          <div className={styles.chat__message_received}>
            <TypingMessage />
          </div>
        )}
      </div>
      <div className={styles.chat__message_box}>
        <div className={styles.chat__message_input}>
          <Image src={smile} width={28} height={28} alt="smile" />
          <input
            placeholder="Chiedimi ciò che vuoi..."
            type="text"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleSendMessageByEnterClick}
          />
          <Image src={select_file} width={26} height={26} alt="select_file" />
        </div>
        <Image
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
