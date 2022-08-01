import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
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

  useEffect(()=>{
    setTimeout(()=>{
      setState({ message: "", open: false, variant: "" });
    }, 3000)
  },[state.open])
  console.log(3355, state.open);
  return (
    <React.Fragment>
      {open && (
        <div 
          style={{
            
            
            display: state.open ? "flex" : "none",
            alignItems:"center",
            justifyContent: "center",                        
            bottom: "30px",
            left: "20px",
            width: "350px",
            height: "80px",
            borderRadius: "5px",
            position: "fixed",
          }}
        >
          {state.message}
        </div>
        // <Alert status={state.variant}>
        //   <AlertIcon />
        //   {/* <Box>
        //     <AlertDescription>{state.message}</AlertDescription>
        //   </Box>
        //   <CloseButton
        //     alignSelf="flex-start"
        //     position="relative"
        //     right={-1}
        //     top={-1}
        //     onClick={handleClose}
        //   /> */}
        // </Alert>
      )}
    </React.Fragment>
  );
};

export default NotifyHelper;
