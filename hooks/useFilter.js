import { useState } from "react"
import { useLocalStorage } from "./useLocalStorage"

export function useFilter(dataSet,callback) {
    const [query,setQuery]=useLocalStorage('query','')
    const filteredData=dataSet.filter((data) => callback(data).toLowerCase().includes(query.toLowerCase()))
    return [filteredData,setQuery,query]
}
