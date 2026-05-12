import {

  useState,
  useRef,
  useEffect

} from "react";

import {
  askQuestion
} from "../services/api";

import Message from "./Message";

function Chat({

  activeDoc

}) {

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState(() => {

      const saved =
        localStorage.getItem("chat");

      return saved

        ? JSON.parse(saved)

        : [

            {
              role: "ai",
              text:
                "Hello! Upload PDFs and ask questions."
            }

          ];
    });

  const [loading, setLoading] =
    useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {

    localStorage.setItem(
      "chat",
      JSON.stringify(messages)
    );

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  const clearChat = () => {

    localStorage.removeItem("chat");

    setMessages([
      {
        role: "ai",
        text: "Chat cleared."
      }
    ]);
  };

  const typeEffect = (
    fullText,
    callback
  ) => {

    let index = 0;

    let currentText = "";

    const interval = setInterval(() => {

      currentText += fullText[index];

      callback(currentText);

      index++;

      if (
        index >= fullText.length
      ) {

        clearInterval(interval);

      }

    }, 15);
  };

  const sendMessage = async () => {

    if (!question) return;

    if (!activeDoc) {

      alert(
        "Please upload and select a PDF first."
      );

      return;
    }

    const userMessage = {
      role: "user",
      text: question,
    };

    const updatedMessages = [
      ...messages,
      userMessage
    ];

    setMessages(updatedMessages);

    setLoading(true);

    try {

      const res =
        await askQuestion(
          question,
          updatedMessages,
          activeDoc
        );

      const fullAnswer =
        res.data.answer;

      const aiMessage = {
        role: "ai",
        text: "",
      };

      setMessages((prev) => [
        ...prev,
        aiMessage
      ]);

      typeEffect(
        fullAnswer,
        (typedText) => {

          setMessages((prev) => {

            const updated = [...prev];

            updated[
              updated.length - 1
            ] = {
              role: "ai",
              text: typedText,
            };

            return updated;
          });

        }
      );

    } catch (err) {

      console.log(err);

      setMessages((prev) => [

        ...prev,

        {
          role: "ai",
          text:
            "Error getting response"
        }

      ]);
    }

    setQuestion("");

    setLoading(false);
  };

  return (
    <div className="chat-wrapper">

      <button
        className="clear-btn"
        onClick={clearChat}
      >
        Clear Chat
      </button>

      <div className="chat-box">

        {

          messages.map((msg, index) => (

            <Message
              key={index}
              role={msg.role}
              text={msg.text}
            />

          ))
        }

        {
          loading && (

            <p className="loading">

              AI is thinking...

            </p>
          )
        }

        <div ref={bottomRef}></div>

      </div>

      <div className="input-area">

        <input
          value={question}

          onChange={(e) =>
            setQuestion(e.target.value)
          }

          placeholder="Ask something..."
        />

        <button
          onClick={sendMessage}
        >

          Send

        </button>

      </div>

    </div>
  );
}

export default Chat;