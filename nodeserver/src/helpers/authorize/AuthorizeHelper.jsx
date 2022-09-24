

import React, {  useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const AuthorizeHelper = (props) => {
  const { roles } = props;
  const { userInfo } = useSelector((state) => state.getUserInfo);
  let history = useHistory();
  const RedirectToForbidden = () => {
    history.push("/forbiden");
  };

  useEffect(() => {

    
      const intersection = roles.filter((role, id) => (userInfo.full_roles.includes(role)));
      console.log(intersection,6464)
      if(intersection.length === 0){
        RedirectToForbidden()
      }
    
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default AuthorizeHelper;
