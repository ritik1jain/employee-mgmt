import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PeopleIcon from "@material-ui/icons/People";
import ReceiptIcon from "@material-ui/icons/Receipt";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PageviewIcon from "@material-ui/icons/Pageview";
import HelpIcon from "@material-ui/icons/Help";
import CropFreeIcon from "@material-ui/icons/CropFree";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import BarChartIcon from "@material-ui/icons/BarChart";
import BusinessIcon from "@material-ui/icons/Business";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PostAddIcon from "@material-ui/icons/PostAdd";


import { Link } from "react-router-dom";

export function ListRootDrawerItems() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
  
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
  
    return (
      <div> 
        <ListItem
          button
          component={Link}
          to="/dashboard/"
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/dashboard/organizations"
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Add HR" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/dashboard/tenantsList"
          selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="HR List" />
        </ListItem>
        <ListItem
        button
        component={Link}
        to="/dashboard/qrList"
        selected={selectedIndex === 4}
        onClick={event => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <CropFreeIcon />
        </ListItemIcon>
        <ListItemText primary="QR Codes" />
      </ListItem>
        {/* <ListItem
          button
          component={Link}
          to="/dashboard/Reports"
          selected={selectedIndex === 4}
          onClick={event => handleListItemClick(event, 4)}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem> */}
      </div>
    );
}
  
export function ListSeniorDrawerItems() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <ListItem
        button
        component={Link}
        to="/dashboard/"
        selected={selectedIndex === 1}
        onClick={event => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
          button
          component={Link}
          to="/dashboard/createAsset"
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Add Executive" />
        </ListItem>
      {/* <ListItem
        button
        component={Link}
        to="/dashboard/addUsers"
        selected={selectedIndex === 2}
        onClick={event => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Add Executives" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/usersList"
        selected={selectedIndex === 3}
        onClick={event => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Executives List" />
      </ListItem> */}
      {/* <ListItem
        button
        component={Link}
        to="/dashboard/reports"
        selected={selectedIndex === 4}
        onClick={event => handleListItemClick(event,4)}
      >
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem> */}
      <ListItem
        button
        component={Link}
        to="/dashboard/uploadData"
        selected={selectedIndex === 5}
        onClick={event => handleListItemClick(event, 5)}
      >
        <ListItemIcon>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText primary="Upload Executives" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/viewData"
        selected={selectedIndex === 6}
        onClick={event => handleListItemClick(event, 6)}
      >
        <ListItemIcon>
          <PageviewIcon />
        </ListItemIcon>
        <ListItemText primary="View Executive" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/search"
        selected={selectedIndex === 7}
        onClick={event => handleListItemClick(event, 7)}
      >
        <ListItemIcon>
          <SearchRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItem>
      {/* <ListItem
        button
        component={Link}
        to="/dashboard/qrList"
        selected={selectedIndex === 8}
        onClick={event => handleListItemClick(event, 8)}
      >
        <ListItemIcon>
          <CropFreeIcon />
        </ListItemIcon>
        <ListItemText primary="QR Codes" />
      </ListItem> */}
      {/* <ListItem
        button
        component={Link}
        to="/dashboard/guide"
        selected={selectedIndex === 9}
        onClick={event => handleListItemClick(event, 9)}
      >
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary="Guide" />
      </ListItem> */}
    </div>
  );
}

export function ListJuniorDrawerItems() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
  
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
  
    return (
      <div>
        <ListItem
          button
          component={Link}
          to="/dashboard/"
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {/* <ListItem
          button
          component={Link}
          to="/dashboard/createAsset"
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Create Asset" />
        </ListItem> */}
        {/* <ListItem
          button
          component={Link}
          to="/dashboard/floorToFile"
          selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Floor to file" />
        </ListItem> */}
        <ListItem
          button
          component={Link}
          to="/dashboard/viewData"
          selected={selectedIndex === 4}
          onClick={event => handleListItemClick(event, 4)}
        >
          <ListItemIcon>
            <PageviewIcon />
          </ListItemIcon>
          <ListItemText primary="View Data" />
        </ListItem>
        {/* <ListItem
          button
          component={Link}
          to="/dashboard/qrList"
          selected={selectedIndex === 5}
          onClick={event => handleListItemClick(event, 5)}
        >
          <ListItemIcon>
            <CropFreeIcon />
          </ListItemIcon>
          <ListItemText primary="QR Codes" />
        </ListItem> */}
        {/* <ListItem
          button
          component={Link}
          to="/dashboard/guide"
          selected={selectedIndex === 6}
          onClick={event => handleListItemClick(event, 6)}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Guide" />
        </ListItem> */}
      </div>
    );
}

export function ListAuditorDrawerItems() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
  
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
  
    return (
      <div>
        <ListItem
          button
          component={Link}
          to="/dashboard/"
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/dashboard/viewData"
          selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <PageviewIcon />
          </ListItemIcon>
          <ListItemText primary="View Data" />
        </ListItem>
        {/* <ListItem
          button
          component={Link}
          to="/dashboard/floorToFile"
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Floor to file" />
        </ListItem> */}
      </div>
    );
}
  
