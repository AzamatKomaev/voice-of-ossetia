import {useEffect, useState} from "react";
import axios from "../api/api-client";
import {AxiosResponse} from "axios";

export const useFetch = (path: string, options: any) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState<boolean>(true)

  const sendRequest = async() => {
    let response: AxiosResponse
    response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/${path}`, options)

    if (!response) setLoading(true)
    else {
      setLoading(false)
      setData(response.data)
    }

  }

  useEffect(() => {
    sendRequest()
  }, [])

  return [data, loading]
}