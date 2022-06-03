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
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const sendRequest = async() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/${path}`, options)
      .then(response => {
        setData(response.data)
        setStatusCode(response.status)
      })
      .catch(error => {
        if (error.response) {
          setData(error.response.data)
          setStatusCode(error.response.status)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    sendRequest()
  }, [])

  return [data, statusCode, loading]
}

/**
 * Custom hook to get query params.
 */
export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
