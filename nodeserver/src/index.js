/*!

=========================================================
* Argon Dashboard Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-chakra
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-chakra/blob/master/LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import NotifyProvider from "helpers/notify/NotifyProvider.jsx";
import AuthLayout from "./layouts/Auth.js";
import AdminLayout from "./layouts/Admin.js";
import RTLLayout from "./layouts/RTL.js"; // Chakra imports
import { ChakraProvider } from "@chakra-ui/react";
import store from '../src/redux/store'
import { Provider } from "react-redux";
// Custom Chakra theme
import theme from "./theme/theme.js";
import "./index.css";
import StudentLayout from "layouts/Student.js";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import PaymentVerify from "views/Pages/PaymentVerify.js";


const persistore = persistStore(store)
ReactDOM.render(
  // <div className="body">
  <Provider store={store}>

  <ChakraProvider theme={theme} resetCss={false} position="relative">

    <PersistGate persistor={persistore} loading={null}>

  <NotifyProvider>
      <HashRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Route path={`/student`} component={StudentLayout}/>
          <Route path={`/rtl`} component={RTLLayout} />
          <Route path={`/paymentverify/:userName/:courseId/:products/:price`} component={PaymentVerify} />
          <Redirect from={`/`} to="/admin/dashboard" />
        </Switch>
      </HashRouter>
    </NotifyProvider>

    </PersistGate>
  
  </ChakraProvider>
  </Provider>,

  // </div>
  document.getElementById("root")
);
