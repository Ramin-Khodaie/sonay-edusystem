import { useEffect, useState } from "react";
import { bixious } from "services/main";

export const useConfirmUserEmailPhone = (username, email, phone = "") => {
  const [isValid, setIsValid] = useState({
    userMessage: "",
    userStatus: false,
    emailMessage: "",
    emailStatus: false,
    phoneMessage: "",
    phoneStatus: false,
  });

  useEffect(() => {
    
    bixious
    .get("/users/checkregisterform", {
      params: {
        user_name: username,
        email: email,
        phone:phone
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setIsValid({userMessage: "",
        userStatus: true,
        emailMessage: "",
        emailStatus: true,
        phoneMessage: "",
        phoneStatus: true})
      }
      return
    })
    .catch((e) => {
      if (
        (e.response.status === 422 && e.response.data.detail.result) ===
        "user_unique"
      ) {
        
        setIsValid({...isValid , userMessage: "این نام کاربری قبلا ثبت شده است",
        userStatus: false,
        emailMessage: "",
        phoneMessage: "",

        })

    } else if (
        (e.response.status === 422 && e.response.data.detail.result) ===
        "email_unique"
      ) {
        setIsValid({...isValid , emailMessage: "این ایمیل قبلا ثبت شده است",
        emailStatus: false,
        phoneMessage: "",
        phoneMessage: "",
        })
        // setValid({...valid , email : false})
      } else if (
        (e.response.status === 422 && e.response.data.detail.result) ===
        "phone_unique"
      ) {
        setIsValid({...isValid , phoneMessage: "این شماره قبلا ثبت شده است",
        phoneStatus: false,
        emailMessage: "",
        userMessage: "",
        })
      } else {
      }
    });


  }, [username, email, phone]);

  return isValid;
};
