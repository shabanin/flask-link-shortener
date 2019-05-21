import React, { Component } from "react";
import axios from "axios";

class Create extends Component {
  state = {
    original_link: "",
    valid: false,
    created: false,
    link: {},
    copied: false
  };
  changeHandler = event => {
    this.setState({
      original_link: event.target.value,
      valid: this.validate(event.target.value)
    });
  };
  submitFormHandler = event => {
    event.preventDefault();
    console.log("submit: " + this.state.original_link);
    axios("/api/create_link?original_link=" + encodeURIComponent(this.state.original_link)).then(response =>
      this.setState({ created: true, link: response.data.link })
    );
  };
  validate(value = this.state.original_link) {
    var res = value.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    let valid = res != null;
    return valid;
  }

  render() {
    console.log(this.props);
    return (
      <div className="d-flex flex-column align-items-center">
        <h1 className="m-4">Create new shortened link</h1>
        <form
          onSubmit={this.submitFormHandler}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="form-group d-flex flex-column align-items-center ">
            <p>Your link: </p>
            <input
              type="text"
              name="original_link"
              value={this.state.original_link}
              onChange={this.changeHandler}
              className="w-100 form-control form-control-lg"
            />
          </div>
          <button className="btn btn-dark btn-lg" disabled={!this.state.valid}>
            Submit
          </button>
        </form>
        {this.state.created ? (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="m-4 allign-center">Your shortened link:</p>
            <div className="alert alert-success text-monospace" role="alert">
              {window.location.origin + "/" + this.state.link.shortened_link}
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default Create;
