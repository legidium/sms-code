import React from "react";

const noop = () => {};

class SmsCodeInput extends React.Component {
  render() {
    const {
      error,
      disabled,
      getInputProps,
      getButtonProps,
      buttonLabel = "Отправить повторно"
    } = this.props;

    return (
      <div className="sms-code-input">
        <div>
          <input
            type="text"
            disabled={disabled}
            className="sms-code-input__input"
            {...getInputProps()}
          />
          {error && <div className="sms-code-input__error">{error}</div>}
        </div>
        <div>
          <button
            type="button"
            disabled={disabled}
            className="sms-code-input__button"
            {...getButtonProps()}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    );
  }
}

export default SmsCodeInput;
