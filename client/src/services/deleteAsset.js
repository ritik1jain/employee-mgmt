import http from "./httpServices";
import config from "../config";

const apiUrlToDeleteAsset = config.apiUrl + "/deleteEmployee";

export function deleteAsset(id) {
  const result = http.post(apiUrlToDeleteAsset, { id });
  return result;
}

export default {
  deleteAsset
};
