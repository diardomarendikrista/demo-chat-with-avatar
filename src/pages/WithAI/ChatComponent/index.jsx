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
import axios from "axios";

export default function ChatComponent({ model }) {
  const [, setIsTalking] = useAtom(isTalkingAtom);
  const [init, setInit] = useState(true); // prevent double 1st message at development (due to strictmode)

  const [messages, setMessages] = useState([]); // semua pesan disini
  const [aiLoading, setAiLoading] = useState(true); // kalo loading, disable button send biar animasi ga kacau. hehe
  const [message, setMessage] = useState(""); // buat inputan yang kita ketik

  const messageSectionRef = useRef(null);

  const modelText =
    model === "openai"
      ? "OpenAI"
      : model === "gemini"
        ? "Gemini"
        : "Invalid Model";

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!message || aiLoading) return;
    const messageToAI = message;
    const newMessage = { isYou: true, message }; // isYou = flag buat posisi kiri kanan
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    // scroll to bottom
    setTimeout(() => {
      messageSectionRef.current.scrollTop =
        messageSectionRef.current.scrollHeight;
    }, 100);

    handleAISendMessage(messageToAI);
  };

  const handleAISendMessage = async (newMessages) => {
    if (model === "openai") {
      handleOpenAISendMessage(newMessages);
    } else if (model === "gemini") {
      handleGeminiSendMessage(newMessages);
    } else {
      console.log("error AI model not found");
    }
  };

  const handleGeminiSendMessage = async (newMessages) => {
    try {
      setAiLoading(true);
      // kasih baloon loading
      const loadingMessage = {
        message: ". . .",
        id: "loading", // Add an id for tracking (yang nantinya dihapus)
      };
      setMessages((prevMessages) => [...prevMessages, loadingMessage]);
      const response = await axios.post("/.netlify/functions/chat-gemini", {
        messages: newMessages,
      });

      const botMessage = response.data.candidates[0].content.parts[0].text;

      await new Promise((resolve) => setTimeout(resolve, 2000));
      // hapus ballon loading
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== "loading")
      );

      // kasih chat
      const newMessage = {
        message: botMessage,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setIsTalking(true);
      // scroll to bottom
      setTimeout(() => {
        messageSectionRef.current.scrollTop =
          messageSectionRef.current.scrollHeight;
      }, 100);
    } catch (error) {
      console.log(error, "error handleAISendMessage");
      if (error?.response?.data?.error?.message) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // hapus ballon loading
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== "loading")
        );

        const newMessage = {
          message: error?.response?.data?.error?.message,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setIsTalking(true);
      }
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 5500));
      setAiLoading(false);
      setIsTalking(false);
    }
  };

  const handleOpenAISendMessage = async (newMessages) => {
    try {
      setAiLoading(true);
      // kasih baloon loading
      const loadingMessage = {
        message: ". . .",
        id: "loading", // Add an id for tracking (yang nantinya dihapus)
      };
      setMessages((prevMessages) => [...prevMessages, loadingMessage]);
      const response = await axios.post("/.netlify/functions/chat-openai", {
        messages: newMessages,
      });

      const botMessage = response.data.choices[0].message;

      await new Promise((resolve) => setTimeout(resolve, 2000));
      // hapus ballon loading
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== "loading")
      );

      // kasih chat
      const newMessage = {
        message: botMessage,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setIsTalking(true);
      // scroll to bottom
      setTimeout(() => {
        messageSectionRef.current.scrollTop =
          messageSectionRef.current.scrollHeight;
      }, 100);
    } catch (error) {
      console.log(error, "error handleAISendMessage");
      if (error?.response?.data?.error?.message) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // hapus ballon loading
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== "loading")
        );

        const newMessage = {
          message: error?.response?.data?.error?.message,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setIsTalking(true);
      }
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 5500));
      setAiLoading(false);
      setIsTalking(false);
    }
  };

  useEffect(() => {
    if (!init) {
      // handleAISendMessage();
      setAiLoading(false);
      setIsTalking(false);
    }
  }, [init]);

  // prevent double 1st message at development (due to strictmode)
  useEffect(() => {
    setInit(false);
  }, []);

  return (
    <ContainerChat>
      <ChatHeader>
        <div className="title">I WISH - {modelText}</div>
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
