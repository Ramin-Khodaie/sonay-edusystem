import { useContext } from "react";
import { AuthorizeContext } from "./AuthorizeContext";


const useAuthorize = () =>{
    const context = useContext(AuthorizeContext)


    function authorize(message, open, variant , status){
        
        context.Authorize(message, open, variant , status)
    }

    return authorize
}

export default useAuthorize