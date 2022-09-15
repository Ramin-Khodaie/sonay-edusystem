import { Spinner } from "@chakra-ui/react";
import { useQuery } from "hooks/useQuery";
import React, { useEffect } from "react";
import { useParams, use, useLocation } from "react-router-dom";
import { verifyRegistration } from "services/purchase";

function PaymentVerify(props) {
  let query = useQuery();
  // let q = useLocation()
  const { userName, courseId , products , price } = useParams();

  const  authority = query.get('Authority')
  const  paymentStatus = query.get('Status')
  console.log(userName, courseId , products,price , query.get("Authority") , paymentStatus, 74);
  const doVerify =  () => {

      verifyRegistration(userName , courseId , products ,price , authority ).then((res)=>{
        console.log(res , 74)
      })
    // console.log(res,9898)

  };
  useEffect(() => {
    if(paymentStatus==='OK'){
        console.log("it is ok")
        doVerify(userName , courseId , products , authority );

    }
  }, []);

  return (
    <Spinner
      thickness="4px"
      speed="0.8s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  );
}

export default PaymentVerify;
