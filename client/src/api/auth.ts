import axios from './api-client'
import {AxiosResponse} from "axios";

export class AuthAPI {
  // Register new users.
  public static async register(data: any): Promise<AxiosResponse> {
    try {
      return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/create/`, data);
    } catch (e: any) {
      return e.response;
    }
  }

  // Login a user creating a token.
  public static async login(data: any): Promise<AxiosResponse> {
    try {
      return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login/`, data);
    } catch (e: any) {
      return e.response;
    }
  }

  // Get data about current user
  public static async getMe(): Promise<AxiosResponse> {
    try {
      return await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth/me/`);
    } catch (e: any) {
      return e.response;
    }
  }
}