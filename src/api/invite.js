import axios from "axios";

export const sendInvite = inviteInfos => {
  return axios.post("/api/invite", inviteInfos);
};

export const sendInviteConfirmation = inviteConfirmationInfos => {
  return axios.post(`/api/invite/${inviteConfirmationInfos.inviteToken}`, inviteConfirmationInfos);
};
