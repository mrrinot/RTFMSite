import axios from "axios";

export const sendInvite = inviteInfos => {
  return axios.post("/invite", inviteInfos);
};

export const sendInviteConfirmation = inviteConfirmationInfos => {
  return axios.post(`/invite/${inviteConfirmationInfos.inviteToken}`, inviteConfirmationInfos);
};
