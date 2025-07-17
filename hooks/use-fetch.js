
import { useState } from "react";
import { toast } from "sonner"

const useFetch =  (cb) => {
    const [data , setData] = useState(undefined) ;
    const [loading , setLoading] = useState(null);
    const [error , setError ] = useState(null ) ;

    const fn = async (...args) =>{
        console.log("ARGS AREEEEEEEE" ,  args)
        setLoading(true) ;
        setError(null) ;

        try{
           const responce = await cb(...args) ;
           setData(responce) ;
           setError(null ) ; 
        }catch(err){
            setError(err) ;
            toast.error(err.message) ;
        }finally{
            setLoading(false)
        }
    }

    return {data , loading , error , fn , setData } ;
}

export default useFetch ;