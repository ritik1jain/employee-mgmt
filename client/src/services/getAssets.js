import http from "./httpServices";
import config from "../config";

const apiUrlToGetAssets = config.apiUrl + "/getEmployees";

// For getting all assets
export function getAllAssets() {
  const result = http.get(apiUrlToGetAssets + "/all");
  return result;
}

// For View Data page GUI View
export function getDistinctAssetsCategory() {
  const result = http.get(apiUrlToGetAssets + "/distinctdepartment");
  return result;
}

// For getting distincts assets by subcategory, 1-assetSubCategoryList.jsx
export function getDistinctAssetsSubCategory(category) {
  const result = http.get(
    apiUrlToGetAssets + "/distinctSubdepartment/" + category
  );
  return result;
}

// For getting all assets for a specific category and sub category, 2-assetList.jsx
export function getAssetsSubCategory(category) {
  const result = http.get(
    apiUrlToGetAssets + "/Employeelist/" + category  
  );
  return result;
}

// For getting an asset by _id, Asset Information page
export function getAssetById(id) {
  const result = http.get(apiUrlToGetAssets + "/getEmployeeById/" + id);
  return result;
}

// export function getAssetImage() {
//   const result = http.get(`http://localhost:3001/getImage`);
//   return result;
// }
