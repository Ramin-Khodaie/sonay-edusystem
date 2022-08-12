import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import React, { useContext, useEffect, useState } from "react";
import { NotifyContext } from "./NotifyContext";

const NotifyHelper = (props) => {
  const context = useContext(NotifyContext);
  context.Notify = show;
  const [state, setState] = useState({
    message: "",
    open: false,
    variant: "solid",
    status: "success",
  });

  function show(message,open, variant, status = "success") {
    //const opts=options ||{};
    setState({
      message: message,
      open: open,
      status: status,
      variant: variant,
    });
  }

  useEffect(() => {
    setTimeout(() => {
      setState({...state ,  message: "", open: false });
    }, 7000);
  }, [state.open]);


  return (
    <React.Fragment>
      {open && (
        <Alert
        variant={state.variant}
        status={state.status}
          style={{
            display: state.open ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            bottom: "30px",
            left: "20px",
            width: "350px",
            height: "80px",
            borderRadius: "5px",
            position: "fixed",
            
          }}
        >
          <AlertIcon />
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
    </React.Fragment>
  );
};

export default NotifyHelper;
