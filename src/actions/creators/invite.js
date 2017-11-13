import {
  DO_INVITE_SEND,
  RETRIEVED_INVITE_STATUS,
  DO_INVITE_CONFIRM,
  RETRIEVED_INVITE_CONFIRM_STATUS,
  INVITE_LOADING,
} from "../types";

export function sendInviteAttempt(inviteInfos) {
  return {
    type: DO_INVITE_SEND,
    inviteInfos,
  };
}

export function inviteStatus(inviteInfos, errors = {}) {
  return {
    type: RETRIEVED_INVITE_STATUS,
    inviteInfos,
    errors,
  };
}

export function sendInviteConfirmationAttempt(inviteConfirmationInfos) {
  return {
    type: DO_INVITE_CONFIRM,
    inviteConfirmationInfos,
  };
}

export function inviteConfirmStatus(inviteConfirmationStatus, errors = {}) {
  return {
    type: RETRIEVED_INVITE_CONFIRM_STATUS,
    inviteConfirmationStatus,
    errors,
  };
}

export function loadingInvite(loading) {
  return {
    type: INVITE_LOADING,
    loading,
  };
}
