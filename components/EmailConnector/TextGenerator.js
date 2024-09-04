"use client";

import React, { useState } from "react";

import DocImg from "../../public/images/icons/document-file.png";
import TopBar from "../Common/TopBar";
import styles from './EmailConnector.module.css';
import Dropdown from "../Dropdown/Dropdown";

const TextGenerator = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    imapHost: "imap.gmail.com",
    imapPort: "993",
    imapTls: "true",
    imapSecure: "true",
    smtpHost: "smtp.gmail.com",
    smtpPort: "465",
    smtpTls: "true",
    smtpSecure: "true"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleConnect = async (e) => {
    try {
      e.preventDefault()
      const payload = {
        imapConfig: {
          host: formData.imapHost,
          port: formData.imapPort,
          tls: formData.imapTls,
          secure: formData.imapSecure,
          user: formData.email,
          password: formData.password,
        },
        smtpConfig: {
          host: formData.smtpHost,
          port: formData.smtpPort,
          tls: formData.smtpTls,
          secure: formData.smtpSecure,
          user: formData.email,
          password: formData.password,
        }
      };
      const token = document.cookie.split('; ').find(row => row.startsWith('Authorization='))?.split('=')[1];
      const response = await fetch("http://localhost:5002/user/addEmail", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        },
        body: JSON.stringify(payload),
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
        <ul>
          <li>Enable a 2 Factor Authentication on this Email</li>
          <li>Generate In-App Password and use that Password in the field below</li>
        </ul>
        <h2 className={styles.title}>Connect your email</h2>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className={styles.emailInput}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your inapp password"
        className={styles.emailInput}
      />
      <p className={styles.heading}>Provide your IMAP Configurations</p>

      <Dropdown
        options={[{ value: "imap.gmail.com", label: "imap.gmail.com" }]}
        placeholder="Host"
        value={formData.imapHost}
        onChange={(value) => handleDropdownChange("imapHost", value)}
      />
      <Dropdown
        options={[
          { value: "993", label: "993" },
          { value: "143", label: "143" }
        ]}
        placeholder="Port"
        value={formData.imapPort}
        onChange={(value) => handleDropdownChange("imapPort", value)}
      />
        <Dropdown
          options={[
            { value: "true", label: "true" },
            { value: "false", label: "false" }
          ]}
          placeholder="TLS"
          value={formData.imapTls} 
          onChange={(value) => handleDropdownChange("imapTls", value)}
        />
      <Dropdown
        options={[
          { value: "true", label: "true" },
          { value: "false", label: "false" }
        ]}
        placeholder="Secure"
        value={formData.imapSecure}
        onChange={(value) => handleDropdownChange("imapSecure", value)}
      />
      <p className={styles.heading}>Provide your SMTP Configurations</p>
      <Dropdown
        options={[{ value: "smtp.gmail.com", label: "smtp.gmail.com" }]}
        placeholder="Host"
        value={formData.smtpHost}
        onChange={(value) => handleDropdownChange("smtpHost", value)}
      />
      <Dropdown
        options={[
          { value: "465", label: "465" },
          { value: "587", label: "587" },
          { value: "25", label: "25" }
        ]}
        placeholder="Port"
        value={formData.smtpPort}
        onChange={(value) => handleDropdownChange("smtpPort", value)}
      />
      <Dropdown
        options={[
          { value: "true", label: "true" },
          { value: "false", label: "false" }
        ]}
        placeholder="TLS"
        value={formData.smtpTls}
        onChange={(value) => handleDropdownChange("smtpTls", value)}
      />
      <Dropdown
        options={[
          { value: "true", label: "true" },
          { value: "false", label: "false" }
        ]}
        placeholder="Secure"
        value={formData.smtpSecure}
        onChange={(value) => handleDropdownChange("smtpSecure", value)}
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
