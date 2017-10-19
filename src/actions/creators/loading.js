import { PAGE_LOADING } from "../types";

export function loading(isLoading) {
  return {
    type: PAGE_LOADING,
    isLoading,
  };
}
