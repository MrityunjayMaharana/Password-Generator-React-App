import React, { useState, useEffect, useCallback, useRef } from "react";
import { IoMdRefreshCircle } from "react-icons/io";
import { TbBrandReact } from "react-icons/tb";


function PasswordGen() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const textToSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0];
    utterance.volume = 0.6;
    utterance.pitch = 1.5;
    speechSynthesis.speak(utterance);
  }

  const generatePassword = useCallback(() => {
    let stringSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      stringSet += "0123456789";
    }
    if (charAllowed) {
      stringSet += "~!@#$%^&*(){}[]<>";
    }

    let pass = "";
    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * stringSet.length);
      pass += stringSet.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    textToSpeech("Password copied to the clipboard!!");
  }, [password]);

  const refreshPage = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, charAllowed, generatePassword]);

  return (
    <div className="main">
        <IoMdRefreshCircle onClick={refreshPage} className="refresh-btn"/>
      <h1>Password Generator</h1>
      <div className="input-section">
        <input
          type="text"
          value={password}
          placeholder="password"
          ref={passwordRef}
          readOnly
        />
        <button className="copy-btn" onClick={copyToClipboard}>
          copy
        </button>
      </div>
      <div className="selection-section">
        <div className="selections sl-1">
          <label className="len-label">Length <span className="length-span">{"{"}</span>{`${length}`}<span className="length-span">{"}"}</span></label>
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(event) => setLength(event.target.value)}
          />
        </div>
        <div className="selections sl-2">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            onChange={() => setNumAllowed((prev) => !prev)}
          />
          <label>{` Number`}</label>
        </div>
        <div className="selections sl-3">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label>{` Special Character`}</label>
        </div>
      </div>
      <footer><p>Made with</p> <span>
      <TbBrandReact />
      </span><p>by Mrityunjay &copy; 2024</p></footer>
    </div>
  );
}

export default PasswordGen;
