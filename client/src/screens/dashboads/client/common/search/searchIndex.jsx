import React, { Fragment } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import SearchBox from "./components/searchBox";
import Form from "components/form/form";
import { searchQuery } from "services/search";
import SearchCard from "./components/searchCard";

class Search extends Form {
  state = {
    searchText: "",
    searchResults: [],
  };

  handleChange = (e) => {
    this.setState({ searchText: e.target.value }, () => {
      this.searchData();
    });
  };

  searchData = async () => {
    try {
      const { data } = await searchQuery(this.state.searchText);
      this.setState({ searchResults: data });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  render() {
    const { searchText, searchResults } = this.state;
    return (
      <Fragment>
        <Grid>
          <SearchBox onChange={this.handleChange} searchText={searchText} />
          <br />
          {searchResults.length > 0 && (
            <Fragment>
              <Paper
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                  padding: 16,
                }}
              >
                <Typography variant="h6">
                  Total Search Results:&nbsp;{searchResults.length}
                </Typography>
                {searchResults.map((item) => {
                  return (
                    <SearchCard
                    name={item.name}
                      id={item._id}
                    />
                  );
                })}
              </Paper>
            </Fragment>
          )}
        </Grid>
      </Fragment>
    );
  }
}

export default Search;
