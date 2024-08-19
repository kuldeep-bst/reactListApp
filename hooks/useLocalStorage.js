import { useEffect, useState } from "react";

export function useLocalStorage(key,initialData){
    const [data,setData]=useState(initialData)

    useEffect(()=>{
        const existingData=JSON.parse(localStorage.getItem(key));
        if(existingData){
            setData(existingData);
        }
        else{
            localStorage.setItem(key,JSON.stringify(initialData))
        }
    },[])

    const setLocalStorageData=(value)=>{
        if(typeof value==='function')
            localStorage.setItem(key,JSON.stringify(value(data)));
        else
            localStorage.setItem(key,JSON.stringify(value));
        setData(value)
    }
    return [data,setLocalStorageData];
}