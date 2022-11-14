// chakra imports
import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
import Footer from "components/Footer/Footer.js";
// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
import {getActiveRoute, getActiveNavbar} from '../routes'

export default function Pages(props) {
  const { ...rest } = props;
  // ref for the wrapper div
  const wrapper = React.createRef();
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });
  
  
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {

      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
       else {
        return null;
      }
    });
  };
  const navRef = React.useRef();
  document.documentElement.dir = "ltr";
  return (
    <Box ref={navRef} w='100%'>
     
      <Box w='100%'>
        <Box ref={wrapper} w='100%'>
          <Switch>
            {getRoutes(routes)}
            <Redirect from='/auth' to='/auth/signin' />
          </Switch>
        </Box>
      </Box>
      <Box px='24px' mx='auto' width='1044px' maxW='100%' mt='60px'>
        <Footer />
      </Box>
    </Box>
  );
}
