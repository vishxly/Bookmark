import React, { useState, useEffect } from "react";
import "./Greeting.css";
import "../Time/Time.css";

const Greeting: React.FC = () => {
  const [greetingMessage, setGreetingMessage] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isMade, setIsMade] = useState<boolean>(true);

  const submitUserName = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userName);
    setIsMade(true);
  };

  let name: JSX.Element | null = null;
  if (isMade) {
    name = <span>{userName}</span>;
  }

  const openNameInput = () => {
    setIsMade(false);
  };

  useEffect(() => {
    const item = localStorage.getItem("userName");
    const loadedItem = JSON.parse(item || "");
    if (loadedItem) {
      setUserName(loadedItem);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(userName);
    localStorage.setItem("userName", json);
  }, [userName]);

  useEffect(() => {
    const d = new Date();
    const h = d.getHours();

    if (h > 4 && h < 12) {
      setGreetingMessage("Good Morning");
    } else if (h >= 12 && h < 17) {
      setGreetingMessage("Good Afternoon");
    } else {
      setGreetingMessage("Good Evening");
    }
  }, []);

  return (
    <div className="time-card greeting bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r ">
      <span>{greetingMessage}</span>
      <br />
      {!isMade ? (
        <form className="greeting-form" onSubmit={submitUserName}>
          <input
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </form>
      ) : (
        <span className="user-name" onClick={openNameInput}>
          {name}!
        </span>
      )}
    </div>
  );
};

export default Greeting;
