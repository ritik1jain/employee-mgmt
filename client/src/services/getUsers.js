import http from "./httpServices";
import config from "../config";

const urlToGetUsers = config.authApiUrl + "/getUsers";
const urlToGetTenants = config.authApiUrl + "/getAllTenants";
const urlToGetTenantsByOrg = config.authApiUrl + "/getAllTenants/getAllTenantsByOrg";

export function getUsers(db) {
  const result = http.post(urlToGetUsers, { db });
  return result;
}

export function getAllTenants() {
  const result = http.get(urlToGetTenants);
  return result;
}
export function getDistinctOrganisations() {
  const result = http.get(`${urlToGetTenants}/distinctorganisation`);
  return result;
}
export function getTenantsByOrganisation(organisation) {
  const result = http.get(`${urlToGetTenants}/Tenantlist/${organisation}`);
  // const result1 = http.get(``)
  // return {...result, ...result1};
  return result;
}

export function getTenantById(id) {
  const result = http.get(`${urlToGetTenants}/getTenantById/${id}`);
  return result;
}

export function getAllTenantsByOrg(db) {
  const result = http.post(urlToGetTenants, { db });
  return result;
}

export default {
  getUsers,
  getAllTenants
};
