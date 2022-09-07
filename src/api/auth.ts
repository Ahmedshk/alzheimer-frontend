import axios from "../util/axios";
import { getTokenFormat } from "../util/helper";
import { IUser } from "../interfaces";

class AuthApi {
  private static path: string = "/auth";

  static lawyerSignUp(userInput: any) {
    return axios.post(`${this.path}/lawyer/register`, userInput);
  }

  static caregiverSignUp(userInput: any) {
    return axios.post(`${this.path}/caregiver/register`, userInput);
  }

  static signIn(userInput: any) {
    return axios.post(`${this.path}/login`, userInput);
  }

  static whoami() {
    return axios.get(`${this.path}/whoami`, getTokenFormat());
  }

  static uploadAvatar(data: any) {
    return axios.put(`${this.path}/avatar`, data, getTokenFormat());
  }

  static updateProfile(data: Partial<IUser>) {
    return axios.put(`${this.path}`, data, getTokenFormat());
  }

  static changePassword(data: any) {
    return axios.put(`${this.path}/change-password`, data, getTokenFormat());
  }

  static getAllLawyer(page: number, size: number) {
    return axios.get(`/lawyer?size=${size}&page=${page}`);
  }

  static getLawyerById(id: string) {
    return axios.get(`/lawyer/${id}`);
  }

  static createLawyerExpertiseOption(name: string) {
    return axios.post('auth-expertise-options', {
      name
    }, getTokenFormat())
  }

  static getLawyerExpertiseOption() {
    return axios.get('auth-expertise-options', getTokenFormat())
  }

  static deleteProfileRequest() {
    return axios.put('auth-delete', {}, getTokenFormat())
  }
}

export default AuthApi;
