import React, {useEffect, useState} from "react"
import { chackFormValidation } from "utils/passwordValidation"


export const useConfirmPassword = (pass, confirmPass) =>{

const [isValid, setIsValid] = useState({passMessage:"", passStatus:false})

useEffect(()=>{
    const {message, valid} = chackFormValidation(pass, confirmPass)
    if(valid){
        setIsValid({passMessage:"", passStatus:true})        
    }
    else{
        setIsValid({passMessage:message, passStatus:false})
    }
}, [confirmPass, pass])
    
return isValid;
}