import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  ListItemIcon
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { getAllAssets, getAssetsSubCategory } from "services/getAssets";
import LoaderApp from "components/loaderApp";
import { getTenantsByOrganisation} from "services/getUsers";
import { connect } from "services/assetDbCall";

class AssetList extends Component {
  state = {
    result: [],
    category: "",
    loading: true,
    subcategory: ""
  };

  async componentDidMount() {
    try {
      const { category } = this.props.match.params;
      
      if(this.props.user.role === "senior"){
        const { data } = await getAssetsSubCategory(category);
        this.setState({
          result: data,
          category: category,
          loading: false
        });
      } else {
        const { data } = await getTenantsByOrganisation(category);
        // let data1;
        await connect(`${category}-db`)
        .then(async  () => {
        const  data1 = await getAllAssets();
          // console.log(data1.data);
          this.setState(
            {
            result: [...data,...data1.data],
            category: category,
            loading: false
          },() => {console.log(this.state)})
        })
        .catch((err) => {
          console.log(err);
        });
        // console.log(this.state)
        
      }
      
    } catch (error) { console.log(error)}
  }

get assetsList() {
    const { result, category, loading  } = this.state;
    if (loading) return <LoaderApp />;

    return (
      <Fragment>
        <Typography component="p" variant="p">
          Employee List
        </Typography>
        <Typography component="p" variant="p">
          Total: <b>{result.length}</b>
        </Typography>
        <List>
          {result.map(item => {
            // console.log(item);
            return (
              <Paper>
                <ListItem
                  key={item._id}
                  component={Link}
                  style={{ color: "black" }}
                  to={`/dashboard/view/${item.role}/${item._id}`}
                >
                  <ListItemText primary={item.name} />
                  <ListItemIcon>
                    <NavigateNextIcon />
                  </ListItemIcon>
                </ListItem>
              </Paper>
            );
          })}
        </List>
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <Paper
          style={{
            display: 'flex',
            flexDirection: "column",
            overflow: 'auto',
            padding: 16
          }
        }>
          <div>{this.assetsList}</div>
        </Paper>
      </Fragment>
    );
  }
}

export default AssetList;
