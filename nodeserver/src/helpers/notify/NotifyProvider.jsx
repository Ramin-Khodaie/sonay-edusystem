import { NotifyContext } from "./NotifyContext";
import NotifyHelper from "./NotifyHelper";
const NotifyProvider = (props) => {

  const {children} = props
  const notify = {
    Notify() {},
  };

  return (
    <NotifyContext.Provider value={notify}>
      {children}
      <NotifyHelper />
    </NotifyContext.Provider>
  );
};

export default NotifyProvider;
