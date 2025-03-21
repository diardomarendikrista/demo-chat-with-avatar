import { useEffect, useRef, useState } from "react";
import {
  ContainerChat,
  ChatHeader,
  InputSection,
  InputWrapper,
  ButtonWrapper,
  MessageSection,
  ChatBallon,
  MessageWrapper,
} from "./styles";
import { Button, Input } from "antd";
import { useAtom } from "jotai";
import { isTalkingAtom } from "pages/Home/store";

let currentExecutionId = 0; // Digunakan untuk melacak eksekusi terakhir

export default function ChatComponent() {
  const [, setIsTalking] = useAtom(isTalkingAtom);
  const [init, setInit] = useState(true); // prevent double 1st message at development (due to strictmode)

  const [messages, setMessages] = useState([]); // semua pesan disini
  const [aiLoading, setAiLoading] = useState(true); // kalo loading, disable button send biar animasi ga kacau. hehe
  const [message, setMessage] = useState(""); // buat inputan yang kita ketik

  const messageSectionRef = useRef(null);
  let cancelToken = useRef(null);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!message || aiLoading) return;
    const newMessage = { isYou: true, message }; // isYou = flag buat posisi kiri kanan
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    // scroll to bottom
    setTimeout(() => {
      messageSectionRef.current.scrollTop =
        messageSectionRef.current.scrollHeight;
    }, 100);

    handleAISendMessage();
  };

  const handleAISendMessage = async () => {
    const executionId = ++currentExecutionId; // Buat ID unik untuk setiap eksekusi
    triggerAnimation("idle");

    const loadingMessage = {
      message: ". . .",
      id: "loading", // Add an id for tracking (yang nantinya dihapus)
    };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (executionId !== currentExecutionId) return; // Abaikan jika bukan eksekusi terakhir

    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== "loading")
    );

    const newMessage = {
      message:
        "Nostrud reprehenderit proident mollit deserunt dolore tempor ullamco. Ad exercitation laboris eiusmod ullamco ea. Qui ad sunt consectetur in nulla eiusmod minim excepteur.",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    triggerAnimation("talk");

    setTimeout(() => {
      messageSectionRef.current.scrollTop =
        messageSectionRef.current.scrollHeight;
    }, 100);

    await new Promise((resolve) => setTimeout(resolve, 5500));
    if (executionId !== currentExecutionId) return; // Abaikan jika bukan eksekusi terakhir

    setAiLoading(false);
    triggerAnimation("idle");
  };

  useEffect(() => {
    if (!init) handleAISendMessage();
  }, [init]);

  // prevent double 1st message at development (due to strictmode)
  useEffect(() => {
    setInit(false);
  }, []);

  const triggerAnimation = (action) => {
    const event = new CustomEvent("animationEvent", {
      detail: { action },
    });
    window.dispatchEvent(event);
  };

  return (
    <ContainerChat>
      <ChatHeader>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div className="title">I WISH</div>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => triggerAnimation("talk")}
          >
            Talk
          </Button>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => triggerAnimation("idle")}
          >
            Idle
          </Button>
        </div>
        <div>Your AI Companion</div>
      </ChatHeader>
      <MessageSection ref={messageSectionRef}>
        {messages.map((item, i) => (
          <MessageWrapper
            key={i}
            $isYou={item.isYou}
          >
            <ChatBallon $isYou={item.isYou}>{item.message}</ChatBallon>
          </MessageWrapper>
        ))}
      </MessageSection>
      <form onSubmit={handleSendMessage}>
        <InputSection>
          <InputWrapper>
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button
              type="primary"
              htmlType="submit"
              disabled={aiLoading}
            >
              Send
            </Button>
          </ButtonWrapper>
        </InputSection>
      </form>
    </ContainerChat>
  );
}
