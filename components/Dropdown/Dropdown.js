import styles from './Dropdown.module.css';
import { useState, useEffect } from "react";

export default function Dropdown({ options, placeholder, defaultValue, onChange }) {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(event.target.value);
    onChange(value)
  };

  return (
    <div className={styles.container}>
      <label htmlFor="dropdown" className={styles.placeholder}>{placeholder}:</label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        className={styles.options}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
