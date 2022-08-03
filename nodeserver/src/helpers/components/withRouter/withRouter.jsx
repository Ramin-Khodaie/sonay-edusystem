import { useHistory, useLocation } from "react-router-dom";
export function withRouter(Children) {
  return (props) => {
    const location = useLocation();
    const history = useHistory();
    return <Children {...props} history={history} location={location} />;
  };
}
