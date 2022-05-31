import axios, {AxiosResponse} from 'axios';


export class HttpSender {
  private baseUrl: string = `${process.env.REACT_APP_SERVER_URL}/api`
  private readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  async getOne(id: number): Promise<AxiosResponse> {
    try {
      return await axios.get(`${this.baseUrl}/${this.path}/${id}/`)
    } catch (err: any) {
      return err.response
    }
  }

  async getList(): Promise<AxiosResponse> {
    try {
      return await axios.get(`${this.baseUrl}/${this.path}/`)
    } catch (err: any) {
      return err.response
    }
  }

  async create(data: any): Promise<AxiosResponse> {
    try {
      return await axios.post(`${this.baseUrl}/${this.path}/`, data)
    } catch (err: any) {
      return err.response
    }
  }

  async delete(id: number) {
    try {
      return await axios.delete(`${this.baseUrl}/${this.path}/${id}/`)
    } catch (err: any) {
      return err.response
    }
  }
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  const apiToken = localStorage.getItem('api-token')

  if (apiToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("api-token")}`
    }
  }
  config.headers = headers
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default axios;