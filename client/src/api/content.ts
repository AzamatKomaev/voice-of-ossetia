import axios from './api-client'
import {AxiosResponse} from "axios";


export class ContentAPI {
  // Create new category.


  // Create new post.
  public static async createPost(data: any): Promise<AxiosResponse> {
    try {
      return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/posts/`, data);
    } catch (e: any) {
      return e.response;
    }
  }
}

