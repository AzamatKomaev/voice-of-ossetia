import {useEffect, useState} from "react";
import axios from "../api/api-client";
import {AxiosResponse} from "axios";

export const useFetch = (url: string, method: string, options: any) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState()

  const sendRequest = async() => {
    let response: AxiosResponse

    switch (method) {
      case 'GET':
        response = await axios.get(url, options)
        break;
      default:
        response = await axios.get(url, options);
    }

    if (!response) setLoading(true);
    else setLoading(false);


    console.log(response);
  }

  useEffect(() => {
    sendRequest()
  }, [])

  return [data, loading]
}