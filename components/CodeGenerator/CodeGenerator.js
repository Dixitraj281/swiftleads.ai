"use client";

import React, { useEffect, useState } from "react";
import sal from "sal.js";

import imgPhoto from "../../public/images/icons/photo-icon.png";
import styles from "./SMSConnector.module.css"; // Import the updated CSS module

import TopBar from "../Common/TopBar";

const CodeGenerator = () => {
  const [phone, setPhone] = useState("");

  useEffect(() => {
    sal();
  }, []);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleConnect = () => {
    // Handle the connect action here, e.g., sending the phone number to the server
    console.log("Phone number entered:", phone);
  };

  return (
    <>
      <TopBar
        padding={true}
        barImg={imgPhoto}
        title="Sms Connector"
        wdt={24}
        htd={24}
      />
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Connect your Sms</h2>
        </div>
        <div className={styles.contentContainer}>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Enter your number..."
            className={styles.phoneInput}
          />
          <button
            className={styles.connectBtn}
            onClick={handleConnect}
          >
            <span className="text">Connect</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default CodeGenerator;
