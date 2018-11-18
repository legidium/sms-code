import React from "react";
import SmsCodeInput from "./sms-code-input";

const formatErrorMessage = value =>
  ["SMS-код", value, "неверный"].filter(Boolean).join(" ");

const initialState = {
  codeLength: 6,
  error: null,
  validating: false,
  shouldValidate: true
};

class SmsCodeContainer extends React.Component {
  state = { ...initialState };
  input = null;

  componentDidMount() {
    console.log("[CDM]", this.state);
  }

  getActions = () => {
    return {
      onUpdate: this.handleUpdate,
      onValidate: this.handleValidate,
      onRepeat: this.handleRepeat,
      enableValidation: this.enableValidation,
      disableValidation: this.disableValidation
    };
  };

  getHelpers = () => {
    return {
      getInputProps: this.getInputProps,
      getButtonProps: this.getButtonProps
    };
  };

  getInputProps = () => {
    return {
      disabled: this.shouldDisableInput(),
      ref: this.handleInputRef,
      onChange: this.handleUpdate,
      onBlur: this.handleValidate,
      onFocus: this.enableValidation
    };
  };

  getButtonProps = () => {
    return {
      disabled: this.shouldDisableButton(),
      ref: this.handleButtonRef,
      onClick: this.handleReset,
      onMouseDown: this.disableValidation
    };
  };

  handleInputRef = ref => {
    this.input = ref;
  };

  handleUpdate = event => {
    const { value } = event.target;
    console.log("HANDLE UPDATE", value);
    this.update(value);
  };

  handleValidate = () => {
    console.log("HANDLE VALIDATE");
    if (this.state.shouldValidate) {
      this.validate();
    }
  };

  handleReset = () => {
    console.log("HANDLE RESET");
    this.reset();
  };

  enableValidation = () => {
    if (!this.state.shouldValidate) {
      console.log("ENABLE VALIDATION");
      this.setState(() => ({ shouldValidate: true }));
    }
  };

  disableValidation = () => {
    if (this.state.shouldValidate) {
      console.log("DISABLE VALIDATION");
      this.setState(() => ({ shouldValidate: false }));
    }
  };

  shouldDisableInput() {
    return false;
  }

  shouldDisableButton() {
    return false;
  }

  resetInput() {
    this.setState(
      () => ({ error: null }),
      () => {
        this.input.value = "";
        this.input.focus();
      }
    );
  }

  verify(value) {
    console.log("VERIFY");

    this.setState(
      () => ({
        pending: true,
        verifiedValue: value
      }),
      () => {
        setTimeout(() => {
          this.setState(() => ({
            pending: false
          }));
        }, 2000);
      }
    );
  }

  update(value) {
    console.log("UPDATE", value);
    this.setState(() => ({ error: null }));
  }

  validate() {
    console.log("VALIDATE");
    const value = this.input.value.trim();

    if (value.length < this.state.codeLength) {
      this.setState(() => ({ error: formatErrorMessage(value) }));
      return;
    }

    this.verify(value);
  }

  reset() {
    console.log("RESEND");
    this.resetInput();
  }

  render() {
    return (
      <SmsCodeInput
        {...this.state}
        {...this.getActions()}
        {...this.getHelpers()}
      />
    );
  }
}

export default SmsCodeContainer;
