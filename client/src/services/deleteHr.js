import http from "./httpServices";
import config from "../config";

const apiUrlToDeleteAsset = config.authApiUrl + "/deleteHr";

export function deleteHr(id) {
  const result = http.post(apiUrlToDeleteAsset, { id });
  return result;
}

export default {
  deleteHr
};
