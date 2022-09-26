// Chakra imports
import {
    Portal,
    useDisclosure,
    Stack,
    Box,
    useColorMode,
  } from "@chakra-ui/react";
  import Configurator from "components/Configurator/Configurator";
  import Footer from "components/Footer/Footer.js";
  import {
    ArgonLogoDark,
    ArgonLogoLight,
    ChakraLogoDark,
    ChakraLogoLight,
  } from "components/Icons/Icons";
  // Layout components
  import AdminNavbar from "components/Navbars/AdminNavbar.js";
  import Sidebar from "components/Sidebar/Sidebar.js";
  import React, { useState } from "react";
  import { Redirect, Route, Switch } from "react-router-dom";
  import routes  from "routes.js";
  // Custom Chakra theme
  import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
  // Custom components
  import MainPanel from "../components/Layout/MainPanel";
  import PanelContainer from "../components/Layout/PanelContainer";
  import PanelContent from "../components/Layout/PanelContent";
  import bgAdmin from "assets/img/admin-background.png";
  
  import {getActiveNavbar, getActiveRoute} from '../routes'
import TeacherNavbar from "components/Navbars/TeacherNavbar";

  export default function TeacherLayout(props) {
    
    const { ...rest } = props;

    // states and functions
    const [fixed, setFixed] = useState(false);
    const { colorMode } = useColorMode();
    // functions for changing the states from components
    const getRoute = () => {
      return window.location.pathname !== "/student/full-screen-maps";
    };
   
    // This changes navbar state(fixed or not)
    
    const getRoutes = (routes) => {
      return routes.map((prop, key) => {
        if (prop.collapse) {
          return getRoutes(prop.views);
        }
        if (prop.category === "account") {
          return getRoutes(prop.views);
        }
        if (prop.layout === "/teacher") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        } else {
          return null;
        }
      });
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    document.documentElement.dir = "ltr";
    // Chakra Color Mode
    return (
      <Box>
        <Box
          minH='40vh'
          w='100%'
          position='absolute'
          bgImage={colorMode === "light" ? bgAdmin : "none"}
          bg={colorMode === "light" ? bgAdmin : "navy.900"}
          bgSize='cover'
          top='0'
        />
        <Sidebar
          routes={routes}
          logo={
            <Stack direction='row' spacing='12px' align='center' justify='center'>
              {colorMode === "dark" ? (
                <ArgonLogoLight w='74px' h='27px' />
              ) : (
                <ArgonLogoDark w='74px' h='27px' />
              )}
              <Box
                w='1px'
                h='20px'
                bg={colorMode === "dark" ? "white" : "gray.700"}
              />
              {colorMode === "dark" ? (
                <ChakraLogoLight w='82px' h='21px' />
              ) : (
                <ChakraLogoDark w='82px' h='21px' />
              )}
            </Stack>
          }
          display='none'
          {...rest}
        />
        <MainPanel
          w={{
            base: "100%",
            xl: "calc(100% - 275px)",
          }}>
          <Portal>
            <TeacherNavbar
              onOpen={onOpen}
              brandText={getActiveRoute(routes)}
              secondary={getActiveNavbar(routes)}
              fixed={fixed}
              {...rest}
            />
          </Portal>
          {getRoute() ? (
            <PanelContent>
              <PanelContainer>
                <Switch>
                  {getRoutes(routes)}
                  {/* <Redirect from='/student' to='/student/karne' /> */}
                </Switch>
              </PanelContainer>
            </PanelContent>
          ) : null}
          <Footer />
          <Portal>
            <FixedPlugin
              secondary={getActiveNavbar(routes)}
              fixed={fixed}
              onOpen={onOpen}
            />
          </Portal>
          <Configurator
            secondary={getActiveNavbar(routes)}
            isOpen={isOpen}
            onClose={onClose}
            isChecked={fixed}
            onSwitch={(value) => {
              setFixed(value);
            }}
          />
        </MainPanel>
      </Box>
    );
  }
  