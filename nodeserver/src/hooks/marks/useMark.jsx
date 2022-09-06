import { useEffect, useState } from "react";
import { bixios } from "services/main";

export const useMark = (markId) => {
    const [mark , setMark] = useState([]);


  useEffect(() => {
    
if(markId != "-1"){
  bixios
  .get("/marks/getmark" , {
      params: {
        mark_id: markId,
      },
    })
  .then((response) => {
    if (response.status === 200) {
      
      setMark(response.data.data);
    }
  })
  .catch((e) => {});
}

  }, []);

 

  return mark;
};
