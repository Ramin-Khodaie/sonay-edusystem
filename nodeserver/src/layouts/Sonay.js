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
  import bgAdmin from "assets/img/admin-background.jpg";
  import bgAdminDark from "assets/img/admin-background-dark.jpg";
  
  import {getActiveNavbar, getActiveRoute} from '../routes'
import StudentNavbar from "components/Navbars/StudentNavbar";
import { useSelector } from "react-redux";
import { RtlProvider } from "components/RTLProvider/RTLProvider";

  export default function SonayLayOut(props) {

    const { userInfo } = useSelector((state) => state.getUserInfo);
    
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
        if (prop.layout === "/sonay") {
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


    const sidebarFilter = (route)=>{
      const intersection = route.roles.filter((role, id) => (userInfo.full_roles.includes(role)));
      if (intersection.length === 0){
        return false
      }else{
        return true
      }

    }




    return (
    
       <Box>
        <Box
          minH='100vh'
          w='100%'
          position='absolute'
          bgImage={colorMode === "light" ? bgAdmin : bgAdminDark}
          bg={colorMode === "light" ? bgAdmin : bgAdminDark}
          bgSize='cover'
          top='0'
        />
        {
            userInfo && <Sidebar
            
            routes={routes.filter(sidebarFilter)}
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
        }
        <MainPanel
        variant='rtl'
      
        
          w={{
            base: "100%",
            xl: "calc(100% - 275px)",
          }}>
          <Portal>
            <StudentNavbar
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
  