import React, {useEffect, useState} from "react"
import { chackFormValidation } from "utils/passwordValidation"


export const useConfirmPassword = (pass, confirmPass) =>{

const [isValid, setIsValid] = useState({message:"", status:false})

useEffect(()=>{
    const {message, valid} = chackFormValidation(pass, confirmPass)
    if(valid){
        setIsValid({message:"", status:valid})        
    }
    else{
        setIsValid({message:message, valid:false})
    }
}, [confirmPass, pass])
    
return isValid;
}