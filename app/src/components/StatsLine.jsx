import React, { Component } from "react";
import axios from "axios";

class StatsLine extends Component {
  state = {};

  remove() {
    let { shortened_link } = this.props.link;
    axios("/api/remove_link?shortened_link=" + shortened_link).then(response => this.props.reload());
  }
  render() {
    let { original_link, shortened_link, clicks } = this.props.link;
    let origin = window.location.origin;
    let link = origin + "/" + shortened_link;
    return (
      <tr>
        <td>{original_link}</td>
        <td>
          <a href={link}>{link}</a>
        </td>
        <td>{clicks}</td>
        <td style={{ width: "80px" }}>
          <button className="btn btn-danger btn-sm" onClick={() => this.remove()}>
            X
          </button>
        </td>
      </tr>
    );
  }
}

export default StatsLine;
