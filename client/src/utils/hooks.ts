import {useEffect, useMemo, useState} from "react";
import axios from "../api/api-client";
import {AxiosError, AxiosResponse} from "axios";
import {useLocation} from "react-router-dom";

/*
  The hook to make fetch requests.
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

/*
  The hook to get query param.
 */
export const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const usePagination = (path: string, queryParams: any): Array<any> => {
  const [itemList, setItemList] = useState<Array<any>>([])
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null)
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/${path}`, {
      params: queryParams
    })
      .then((response) => {
        setItemList(response.data.data)
        setNextPage(response.data.links.next)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (fetching && nextPage) {
      axios.get(nextPage, {params: queryParams})
        .then((response) => {
          setItemList([...itemList, ...response.data.data])
          setNextPage(response.data.links.next)
        })
        .catch((err: AxiosError) => {
          setNextPage(null)
        })
        .finally(() => {
          setFetching(false)
          setLoading(false)
        })
    }
  }, [fetching])

  const scrollHandler = (e: any) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 300) {
      setFetching(true);
      setLoading(true);
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return [itemList, loading];
}
