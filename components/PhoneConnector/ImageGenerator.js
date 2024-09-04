"use client";

import React, { useEffect, useState } from "react";
import sal from "sal.js";

import imgPhoto from "../../public/images/icons/photo-icon.png";
import styles from "./ImageGenerator.module.css"; // Import the updated CSS module

import TopBar from "../Common/TopBar";

const ImageGenerator = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    sal();
  }, []);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleConnect = async () => {
    // Handle the connect action here, e.g., sending the phone number to the server
    const token = document.cookie.split('; ').find(row => row.startsWith('Authorization='))?.split('=')[1];
    const response = await fetch("http://localhost:5002/user/addPhoneNumber", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify({"phone_number": phone}),
    });

    if (response.ok) {
      setMessage("Phone connected successfully!");
    } else {
      setMessage("Failed to connect Phone. Please try again.");
    }
  };

  return (
    <>
      <TopBar
        padding={true}
        barImg={imgPhoto}
        title="Phone Connector"
        wdt={24}
        htd={24}
      />
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Connect your phone</h2>
        </div>
        <div className={styles.contentContainer}>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Enter your phone number..."
            className={styles.phoneInput}
          />
          <button
            className={styles.connectBtn}
            onClick={handleConnect}
          >
            <span className="text">Connect</span>
          </button>
        </div>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </>
  );
};

export default ImageGenerator;
