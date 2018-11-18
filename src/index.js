import React from "react";
import ReactDOM from "react-dom";
import SmsCode from "./sms-code";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <div className="form">
        <div className="form-row">
          <div className="form-field">
            <div className="form-label">
              <label htmlFor="sms-code">SMS code</label>
            </div>
            <div className="form-input">
              <SmsCode />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
