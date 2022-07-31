import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { NotifyContext } from "./NotifyContext";

const NotifyHelper = (props) => {
  const context = useContext(NotifyContext);
  context.Notify = show;
  const [state, setState] = useState({
    message: "",
    open: false,
    variant: "success",
  });

  function show(message, variant = "success") {
    //const opts=options ||{};
    setState({ message: message, open: true, variant: variant });
  }

  function handleClose() {
    setState({ message: "", open: false, variant: "" });
  }
  return (
    <React.Fragment>
      {open && (
        <Alert status={state.variant}>
          <AlertIcon />
          <Box>
            <AlertDescription>{state.message}</AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={handleClose}
          />
        </Alert>
      )}
    </React.Fragment>
  );
};

export default NotifyHelper;
