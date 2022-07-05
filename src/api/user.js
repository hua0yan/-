import axios from "@/utils/request";
export const Userlogin = (data) =>
  axios({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
export const getSmscode = (mobile) =>
  axios({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
