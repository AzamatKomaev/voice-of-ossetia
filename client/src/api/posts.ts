import {AxiosResponse} from "axios";
import axios from "./api-client";

export class PostAPI {
  public static async create(data: any): Promise<AxiosResponse> {
    try {
      return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/posts/`, data);
    } catch (e: any) {
      return e.response;
    }
  }

}