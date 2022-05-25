import axios from './api-client'
import {AxiosResponse} from "axios";


export class ContentAPI {
  // Create new category.
  public static async createCategory(data: any): Promise<AxiosResponse> {
    try {
      return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/categories/`, data);
    } catch (e: any) {
      return e.response;
    }
  }
}

