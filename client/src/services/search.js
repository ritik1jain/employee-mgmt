import http from "./httpServices";
import config from "../config";

const apiUrlToSearchAsset = config.apiUrl + "/searchEmployees";

export function searchQuery(query) {
  const url = apiUrlToSearchAsset + "?query=" + query;
  const result = http.get(url);
  return result;
}

export default {
  searchQuery
};
