import { useContext } from "react";
import { NotifyContext } from "./NotifyContext";


const useNotify = () =>{
    const context = useContext(NotifyContext)


    function notify(message, open, variant){
        
        context.Notify(message, open, variant)
    }

    return notify
}

export default useNotify