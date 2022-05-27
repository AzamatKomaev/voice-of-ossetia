import {AxiosResponse} from "axios";
import axios from "./api-client";

export class CategoryAPI {
  public static async create(data: any): Promise<AxiosResponse> {
    try {
      return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/categories/`, data);
    } catch (e: any) {
      return e.response;
    }
  }
}