"use client";

import React, { useState } from "react";
import Image from "next/image";

import DocImg from "../../public/images/icons/document-file.png";
import TopBar from "../Common/TopBar";
import styles from './EmailConnector.module.css';

const TextGenerator = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConnect = async () => {
    try {
      const response = await fetch("/api/connect-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Email connected successfully!");
      } else {
        setMessage("Failed to connect email. Please try again.");
      }
    } catch (error) {
      console.error("Error connecting email:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <TopBar
        barImg={DocImg}
        title="Email Connector"
        wdt={14}
        htd={18}
      />
      <div className={styles.emailConnector}>
        <h2 className={styles.title}>Connect your email</h2>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className={styles.emailInput}
        />
        <button
          className={styles.connectBtn}
          onClick={handleConnect}
        >
          <span className="text">Connect</span>
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </>
  );
};

export default TextGenerator;
