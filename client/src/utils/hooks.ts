import {useEffect, useMemo, useState} from "react";
import axios from "../api/api-client";
import {AxiosResponse} from "axios";
import {useLocation} from "react-router-dom";

/**
 * Custom hook to fetch data with axios.
 * @param path
 * @param options
 */
export const useFetch = (path: string, options: any) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState<boolean>(true)

  const sendRequest = async() => {
    let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/${path}`, options)

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

/**
 * Custom hook to get query params.
 */
export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
