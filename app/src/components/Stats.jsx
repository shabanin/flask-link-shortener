import React, { Component } from "react";
import axios from "axios";

import StatsLine from "./StatsLine.jsx";

class Stats extends Component {
  state = {
    data: {},
    loaded: false
  };
  componentDidMount() {
    this.reload();
  }
  reload() {
    axios.get("/api/current_user").then(({ data }) => {
      data.links.sort((a, b) => b.clicks - a.clicks);
      this.setState({ data, loaded: true });
    });
  }
  renderEmpty() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }} className="p-4">
          <h1 style={{ margin: 0 }}>All links created by</h1>
          <button className="btn btn-lg btn-success" onClick={() => this.reload()}>
            Reload
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">original link</th>
              <th scope="col">shortened_link</th>
              <th scope="col">clicks</th>
              <th scope="col" style={{ width: "80px" }}>
                remove
              </th>
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    );
  }
  renderStats() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }} className="p-4">
          <h1 style={{ margin: 0 }}>All links created by {this.state.data.username}</h1>
          <button className="btn btn-lg btn-success" onClick={() => this.reload()}>
            Reload
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">original link</th>
              <th scope="col">shortened_link</th>
              <th scope="col">clicks</th>
              <th scope="col" style={{ width: "80px" }}>
                remove
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.links.map((link, index) => (
              <StatsLine link={link} key={index} reload={() => this.reload()} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  render() {
    if (this.state.loaded) {
      if (this.state.data.authenticated) {
        return this.renderStats();
      } else {
        return <div>Log in to see this page</div>;
      }
    } else {
      return this.renderEmpty();
    }
  }
}

export default Stats;
