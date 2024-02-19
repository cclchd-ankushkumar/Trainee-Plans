

export const  apiCalling = async (url,method,headers,body) =>{
   if(method=="GET"){
      return fetch(url,{
         method:method
        })
        .then((res)=>res.json())
        .then((res)=>res)
        .catch((err)=>err)
     }
     else{
      return fetch(url,{
         method:method,
         headers:headers,
         body:body
        })
        .then((res)=>res.json())
        .then((res)=>res)
        .catch((err)=>err)
      }
      
   }

 
