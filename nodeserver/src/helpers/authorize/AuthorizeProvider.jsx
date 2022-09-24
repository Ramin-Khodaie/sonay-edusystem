import { AuthorizeContext } from "./AuthorizeContext";
import AuthorizeHelper from "./AuthorizeHelper";
const AuthorizeProvider = (props) => {

  const {children , roles} = props
  const authorize = {
    Authorize() {},
  };

  return (
    <AuthorizeContext.Provider value={authorize}>
      {children}
      <AuthorizeHelper roles={roles} />
    </AuthorizeContext.Provider>
  );
};

export default AuthorizeProvider;
