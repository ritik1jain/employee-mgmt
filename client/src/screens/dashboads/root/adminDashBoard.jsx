import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

import QRCodeList from "../client/common/qrCodeList";
import NotFound from "components/pageNotFound";
import EditProfile from "components/editProfile";
import Home from "./components/home";
import Reports from "./components/reports";
import DashboardLayout from "../../../components/dashboard/dashboardLayout";
import TenantsList from "./components/tenantsList";
import Organizations from "./components/orgComponents/organizations";
import ViewData from "../client/common/viewData/viewData";
import AssetList from "../client/common/viewData/guiView/path/2-assetList";
import AssetInformation from "../client/common/viewData/guiView/path/3-assetInformation";

class AdminDashBoard extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <DashboardLayout user={user}>
        <Switch>
          <Route path="/editprofile" component={EditProfile} />
          <Route path="/dashboard/qrList" component={QRCodeList} />
          {/* <Route path="/dashboard/reports" component={Reports} /> */}
          <Route path="/dashboard/organizations" component={Organizations} />
          <Route
            path="/dashboard/tenantsList"
            render={props => <TenantsList user={user} {...props} />}
          />
          <Route exact
            path="/dashboard/view"
            render={props => <ViewData user={user} {...props} />}
          />
          
          <Route exact
            path="/dashboard/viewData/category/:category"
            render={props => <AssetList user={user} {...props} />}
          />
          
          <Route exact
          path="/dashboard/view/:role/:id"
          render={props => <AssetInformation user={user} {...props} />}
        />
        {/* <Route
            path="/dashboard/viewData/:category/:subcategory"
            component={AssetList}
          /> */}
          <Route exact path="/dashboard/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </DashboardLayout>
    );
  }
}

export default AdminDashBoard;
