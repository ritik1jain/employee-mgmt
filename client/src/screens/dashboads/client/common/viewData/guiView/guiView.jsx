import React, { Component, Fragment } from "react";
import { withStyles, Grid } from "@material-ui/core";

import AssetCard from "components/card";
import { getDistinctAssetsCategory } from "services/getAssets";
import {getDistinctOrganisations} from 'services/getUsers';
const styles = {
  boxBorder: {
    borderRadius: "10px",
    opacity: "1",
    padding: "15px",
  },
  content: {
    flexGrow: 1,
    height: "auto",
    overflow: "auto",
  },
};

class GUIView extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    try {
      const { data } = this.props.user.role === "senior" ? await getDistinctAssetsCategory() : await getDistinctOrganisations();
      this.setState({ data: data });
    } catch (error) {}
  }

  get getAssets() {
    const { user } = this.props.user;
    const distinctAssets = this.state.data;
    return (
      <Fragment>
        {distinctAssets.map(function (item) {
          return (
            <div
              className="asset-card-font-style"
              key={item.replace(/\W/g, "_")}
            >
              <AssetCard category={item.replace(/\W/g, "_")} item={item} user={user}>
                {item}
              </AssetCard>
            </div>
          );
        })}
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <Grid container justify="space-evenly">
          {this.getAssets}
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(GUIView);
// import React, { Component, Fragment } from "react";
// import { withStyles, Grid, List,
//   ListItem,
//   ListItemText,
//   Typography,
//   Paper,
//   ListItemIcon } from "@material-ui/core";

// import AssetCard from "components/card";
// import { getAllAssets } from "services/getAssets";


// import { Link } from "react-router-dom";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// import { getAssetsCategory } from "services/getAssets";
// import LoaderApp from "components/loaderApp";


// const styles = {
//   boxBorder: {
//     borderRadius: "10px",
//     opacity: "1",
//     padding: "15px",
//   },
//   content: {
//     flexGrow: 1,
//     height: "auto",
//     overflow: "auto",
//   },
// };

// class GUIView extends Component {
//   // state = {
//   //   data: [],
//   // };

//   // async componentDidMount() {
//   //   try {
//   //     const { data } = await getAllAssets();
//   //     this.setState({ data: data });
//   //   } catch (error) {}
//   // }

//   // get getAssets() {
//   //   const distinctAssets = this.props.data;
//   //   return (
//   //     <Fragment>
//   //       {distinctAssets.map(function (item) {
//   //         return (
//   //           <div
//   //             className="asset-card-font-style"
//   //             key={item.replace(/\W/g, "_")}
//   //           >
//   //             <AssetCard category={item.replace(/\W/g, "_")} item={item}>
//   //               {item}
//   //             </AssetCard>
//   //           </div>
//   //         );
//   //       })}
//   //     </Fragment>
//   //   );
//   // }

//   // render() {
//   //   // const result = this.props.data;
//   //   return (
//   //   //   <Fragment>
//   //   //     <Typography component="p" variant="p">
//   //   //       Executive List
//   //   //     </Typography>
//   //   //     <Typography component="p" variant="p">
//   //   //       Total: <b>{result.length}</b>
//   //   //     </Typography>
//   //   //     <List>
//   //   //       {result.map(item => {
//   //   //         return (
//   //   //           <Paper>
//   //   //             <ListItem
//   //   //               key={item.exeId}
//   //   //               component={Link}
//   //   //               style={{ color: "black" }}
//   //   //               to={`/dashboard/viewData/${item._id}`}
//   //   //             >
//   //   //               <ListItemText primary={item.name} />
//   //   //               <ListItemIcon>
//   //   //                 <NavigateNextIcon />
//   //   //               </ListItemIcon>
//   //   //             </ListItem>
//   //   //           </Paper>
//   //   //         );
//   //   //       })}
//   //   //     </List>
//   //   //   </Fragment>
//   //     <Fragment>
//   //       <Grid container justify="space-evenly">
//   //         {this.getAssets}
//   //       </Grid>
//   //     </Fragment>
//   //   );
//   // }
//   state = {
//     data: [],
//   };

//   async componentDidMount() {
//     try {
//       const { data } = await getDistinctAssetsCategory();
//       this.setState({ data: data });
//     } catch (error) {}
//   }

//   get getAssets() {
//     const distinctAssets = this.state.data;
//     return (
//       <Fragment>
//         {distinctAssets.map(function (item) {
//           return (
//             <div
//               className="asset-card-font-style"
//               key={item.replace(/\W/g, "_")}
//             >
//               <AssetCard category={item.replace(/\W/g, "_")} item={item}>
//                 {item}
//               </AssetCard>
//             </div>
//           );
//         })}
//       </Fragment>
//     );
//   }

//   render() {
//     return (
//       <Fragment>
//         <Grid container justify="space-evenly">
//           {this.getAssets}
//         </Grid>
//       </Fragment>
//     );
//   }
// }

// export default withStyles(styles)(GUIView);



// // class AssetList extends Component {
// //   state = {
// //     result: [],
// //     category: "",
// //     loading: true,
// //     subcategory: ""
// //   };

// //   async componentDidMount() {
// //     try {
// //       const { category, subcategory } = this.props.match.params;
// //       const { data } = await getAssetsSubCategory(category, subcategory);
// //       this.setState({
// //         result: data,
// //         category: category,
// //         loading: false,
// //         subcategory: subcategory
// //       });
// //     } catch (error) {}
// //   }

// //   get assetsList() {
// //     const { result, category, loading, subcategory } = this.state;
// //     if (loading) return <LoaderApp />;

// //     return (
// //       <Fragment>
// //         <Typography component="p" variant="p">
// //           Asset List
// //         </Typography>
// //         <Typography component="p" variant="p">
// //           Total: <b>{result.length}</b>
// //         </Typography>
// //         <List>
// //           {result.map(item => {
// //             return (
// //               <Paper>
// //                 <ListItem
// //                   key={item._id}
// //                   component={Link}
// //                   style={{ color: "black" }}
// //                   to={`/dashboard/viewData/${category}/${subcategory}/${item._id}`}
// //                 >
// //                   <ListItemText primary={item.description} />
// //                   <ListItemIcon>
// //                     <NavigateNextIcon />
// //                   </ListItemIcon>
// //                 </ListItem>
// //               </Paper>
// //             );
// //           })}
// //         </List>
// //       </Fragment>
// //     );
// //   }

// //   render() {
// //     return (
// //       <Fragment>
// //         <Paper
// //           style={{
// //             display: 'flex',
// //             flexDirection: "column",
// //             overflow: 'auto',
// //             padding: 16
// //           }
// //         }>
// //           <div>{this.assetsList}</div>
// //         </Paper>
// //       </Fragment>
// //     );
// //   }
// // }

// // export default AssetList;

