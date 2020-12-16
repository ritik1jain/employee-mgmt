import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CreateAsset from "./components/createAsset";

import NotFound from "components/pageNotFound";
import EditProfile from "components/editProfile";
import Organizations from "./components/orgComponents/organizations";
import UsersList from "./components/tenantsList";
import ViewData from "../common/viewData/viewData";
// import Reports from "./components/auditReport";
import UploadData from "./components/uploadData";
import Home from "./components/home";
import DashboardLayout from "../../../../components/dashboard/dashboardLayout";
// import Guide from "components/guide";
import AssetList from "../common/viewData/guiView/path/2-assetList";
import AssetInformation from "../common/viewData/guiView/path/3-assetInformation";
import QRCodeList from "../common/qrCodeList";
import SearchAsset from "../common/search/searchIndex";
import AssetSubCategoryList from "../common/viewData/guiView/path/1-assetSubCategoryList";
class SeniorUserDS extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <DashboardLayout user={user}>
        <Switch>
          <Route path="/dashboard/search" component={SearchAsset} />
          <Route exact
            path="/dashboard/view/:role/:id"
            render={props => <AssetInformation user={user} {...props} />}
          />
          {/* <Route
            path="/dashboard/viewData/:category/:subcategory"
            component={AssetList}
          /> */}
          <Route exact
            path="/dashboard/viewData/category/:category"
            render={props => <AssetList user={user} {...props} />}
          />
          <Route exact
            path="/dashboard/viewData"
            render={props => <ViewData user={user} {...props} />}
          />
          <Route 
            path="/dashboard/uploadData"
            render={props => <UploadData user={user} {...props} />}
          />
          {/* <Route path="/dashboard/reports" component={Reports} /> */}
          <Route
            path="/dashboard/organizations"
            render={props => <Organizations user={user} {...props} />}
          />
          <Route
            path="/dashboard/tenantsList"
            render={props => <UsersList user={user} {...props} />}

          />
          <Route
            path="/dashboard/createAsset"
            render={props => <CreateAsset user={user} {...props} />}
          />
          {/* <Route path="/dashboard/guide" component={Guide} /> */}
          <Route exact path="/dashboard/editprofile" component={EditProfile} />
          <Route exact path="/dashboard/" component={Home} />
          <Route path="/dashboard/qrList" component={QRCodeList} />
          <Route component={NotFound} />
        </Switch>
      </DashboardLayout>
    );
  }
}

export default SeniorUserDS;
