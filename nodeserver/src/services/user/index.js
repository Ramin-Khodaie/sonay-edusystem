import { bixios } from "services/main";


export const createUser =  (user)=>{
   return new Promise( async (resolve, reject)=>{
    await bixios.post('/users/createuser',{
        _id: user._id,
        username: user.username,
        full_name: user.full_name,
        phone: user.phone,
        email: user.email,
        password: user.password,
        course: user.course,
        roles: user.roles,
    }).then((res)=>{
        if(res.status === 200) resolve(res.data)
    }).catch((err)=>reject(err.response))
   })
}
