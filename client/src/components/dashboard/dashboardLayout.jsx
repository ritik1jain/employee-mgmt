import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Button,
  Menu,
  List,
  MenuItem,
  Container,
  Grid,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import FLookupGif from "../../assets/images/brand/flookupGif.gif";
import FlookupLogo from "../../assets/images/brand/logo.png";
import CacbLogo from "../../assets/images/brand/15.png";
import AppsIcon from "@material-ui/icons/Apps";
import { Link } from "react-router-dom";
import {
  ListRootDrawerItems,
  ListSeniorDrawerItems,
  ListJuniorDrawerItems,
  ListAuditorDrawerItems,
} from "./drawerItems";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  white: {
    color: "#000",
    opacity: 0.95,
    backgroundColor: "#fff",
    margin: theme.spacing(1),
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  profileTextDeco: {
    textDecoration: "none",
    color: "black",
  },
  appBar: {
    backgroundColor: "#009933",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  productsMenuButton: {
    marginRight: 20,
  },
  productsMenuHeading: {
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#009933",
  },
  productIcon: {
    height: 20,
    width: 25,
  },
  productName: {
    padding: 5,
    color: "black",
    fontFamily: "Poppins",
    fontSize: 16,
  },
  menuButton: {
    marginRight: 20,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  titleHide: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  accountMenu: {
    margin: theme.spacing(0.7),
  },
}));

export default function Dashboard({ user, children }) {
  const userData = user || {};
  const role = userData.role;
  const companyName = userData.companyName;
  let drawerList;

  switch (role) {
    case "root":
      drawerList = <ListRootDrawerItems />;
      break;
    case "senior":
      drawerList = <ListSeniorDrawerItems />;
      break;
    case "junior":
      drawerList = <ListJuniorDrawerItems />;
      break;
    case "auditor":
      drawerList = <ListAuditorDrawerItems />;
      break;
    default:
      break;
  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElProductsMenu, setAnchorElProductsMenu] = React.useState(null);

  const handleClickProductsMenu = (event) => {
    setAnchorElProductsMenu(event.currentTarget);
  };

  const handleCloseProductsMenu = () => {
    setAnchorElProductsMenu(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to="/dashboard/editprofile"
      >
        <PersonOutlineIcon className={classes.accountMenu} />
        <Typography className={classes.profileTextDeco}>
          Edit Profile
        </Typography>
      </MenuItem>
      <MenuItem component={Link} to="/logout">
        <ExitToAppIcon color={"secondary"} className={classes.accountMenu} />
        <Typography onClick={handleMenuClose} color="secondary">
          Sign out
        </Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <Tooltip title="Apps by Flookup">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open modal"
              className={classes.productsMenuButton}
              onClick={handleClickProductsMenu}
            >
              <AppsIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="simple-menu"
            anchorEl={anchorElProductsMenu}
            keepMounted
            open={Boolean(anchorElProductsMenu)}
            onClose={handleCloseProductsMenu}
          >
            <img
              src={FlookupLogo}
              style={{ height: 55, width: 130, padding: 10 }}
              alt="Flookup logo"
            />
            <Divider />
            <Typography
              variant="overline"
              className={classes.productsMenuHeading}
            >
              Current
            </Typography>
            <MenuItem>
              <Typography variant="body2" className={classes.productName}>
                FAST
              </Typography>
            </MenuItem>
            <Divider />
            <Typography
              variant="overline"
              className={classes.productsMenuHeading}
            >
              Also Discover
            </Typography>
            <a
              style={{ textDecoration: "none" }}
              href="http://www.15cacb.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MenuItem>
                <img
                  src={CacbLogo}
                  className={classes.productIcon}
                  alt="15CACB logo"
                />
                <Typography variant="body2" className={classes.productName}>
                  15CACB
                </Typography>
              </MenuItem>
            </a>
            <a
              style={{ textDecoration: "none" }}
              href="http://www.caassist.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MenuItem>
                <img
                  src={CacbLogo}
                  className={classes.productIcon}
                  alt={"CA Assist Flookup Logo"}
                />
                <Typography variant="body2" className={classes.productName}>
                  CA Assist
                </Typography>
              </MenuItem>
            </a>
            <Divider />
            <Typography
              variant="overline"
              className={classes.productsMenuHeading}
            >
              Visit us At
            </Typography>
            <a
              href="http://www.flookup.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <MenuItem>
                <img
                  src={FLookupGif}
                  style={{ height: 30, width: 35 }}
                  alt="Flookup gif"
                />
                <Typography variant="body2" className={classes.productName}>
                  Finance Lookup Advisors
                </Typography>
              </MenuItem>
            </a>
          </Menu>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.titleHide}
          >
            Dashboard
          </Typography>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {companyName}
          </Typography>
          <Button
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar className={classes.white}>{userData.name.charAt(0)}</Avatar>
            <Typography color="inherit" className={classes.titleHide}>
              {role}
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{drawerList}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {children}
              {/* <Paper className={classes.paper}>{children}</Paper> */}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
