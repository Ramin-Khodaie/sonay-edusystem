import { useContext } from "react";
import { NotifyContext } from "./NotifyContext";


const useNotify = () =>{
    const context = useContext(NotifyContext)


    function notify(message, open, variant , status){
        
        context.Notify(message, open, variant , status)
    }

    return notify
}

export default useNotify