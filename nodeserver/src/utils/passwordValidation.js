export function chackFormValidation(pass, confirmPass) {
  // password comfirmation check

  if (pass === confirmPass) {
    return {
      messages: "",
      valid: true,
    };
  } else {
    // setValid({...valid, password: false });
    return {
      valid: false,
      message: "رمز عبور با تکرار آن مطابقت ندارد",
    };
  }
}
