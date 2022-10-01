

import React, {  useEffect } from "react";
import { RiFolderSettingsFill } from "react-icons/ri";
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

    if(roles && roles.length !== 0){
      const intersection = roles.filter((role, id) => (userInfo.full_roles.includes(role)));
      if(intersection.length === 0){
        RedirectToForbidden()
      }
    }

    
    
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default AuthorizeHelper;
