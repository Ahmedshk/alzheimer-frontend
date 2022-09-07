import { USER_ROLE } from "../interfaces";
import axios from "../util/axios";
import { getTokenFormat } from "../util/helper";

export default class AdminApi {
  static getUsersByRole(role: USER_ROLE, page: number) {
    return axios.get(
      `/admin/users/${role}?page=${page}&size=${3}`,
      getTokenFormat()
    );
  }

  static toggleLawyerVerification(lawyerId: string) {
    return axios.put(`/admin/lawyer/${lawyerId}`, {}, getTokenFormat());
  }

  static getLawyerById(lawyerId: string) {
    return axios.get(`/admin/lawyer/${lawyerId}`, getTokenFormat());
  }

  static toApproveUser(userId: string) {
    return axios.put(`/admin/users-approve/${userId}`, {}, getTokenFormat())
  }

  static toDisApproveUser(userId: string) {
    return axios.put(`/admin/users-disapprove/${userId}`, {}, getTokenFormat())
  }
  static getAllUsers(page: number) {
    return axios.get(
        `/admin/users-all?page=${page}&size=${3}`,
        getTokenFormat()
    );
  }
}
