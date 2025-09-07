import React, { useContext, useEffect, useRef } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Main = () => {
  const {
    onSent,
    showResult,
    loading,
    input,
    setInput,
    displayHistory,
    activeChatId,
    startListening,
    isListening,
  } = useContext(Context);

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayHistory]);

  return (
    <div className="main">
      <div className="nav">
        <p>Conversa</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!activeChatId ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, SuSi</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming trip</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming trip</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming trip</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            {displayHistory.map((item, index) => (
              <React.Fragment key={index}>
                <div className="result-title">
                  <img src={assets.user_icon} alt="" />
                  <p>{item.prompt}</p>
                </div>
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="" />
                  {item.response === "..." ? (
                    <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  ) : (
                    // Use ReactMarkdown to render the response
                    <ReactMarkdown
                      children={item.response}
                      components={{
                        code(props) {
                          const { children, className, node, ...rest } = props;
                          const match = /language-(\w+)/.exec(className || "");
                          return match ? (
                            <SyntaxHighlighter
                              {...rest}
                              PreTag="div"
                              children={String(children).replace(/\n$/, "")}
                              language={match[1]}
                              style={atomDark}
                            />
                          ) : (
                            <code {...rest} className={className}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    />
                  )}
                </div>
              </React.Fragment>
            ))}
            <div ref={scrollRef} />
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder={isListening ? "Listening..." : "Enter a prompt here"}
              onKeyDown={(e) => e.key === "Enter" && onSent()}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img
                onClick={startListening}
                src={assets.mic_icon}
                alt="mic icon"
                className={isListening ? "listening" : ""}
              />
              {input ? (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="send icon"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            please double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
