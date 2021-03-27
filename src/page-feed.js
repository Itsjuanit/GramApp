import React from "react";
import Nav from "./component-nav";
import ReactDOM from "react-dom";
import Modal from "./component-modal";
import FeedContent from "./component-feed";
import firebase from "firebase/app";
import "firebase/auth";

class Feed extends React.Component {
  state = {
    user: {
      photoURL: "",
      displayName: "",
    },
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
      if (this.state.user) {
        this.props.history.push("/feed");
        if (!this.state.user.photoURL)
          this.setState({
            user: {
              displayName: user.email.substr(0, user.email.search("@")),
              photoURL:
                "https://cdn.icon-icons.com/icons2/1378/PNG/128/avatardefault_92824.png",
            },
          });
      } else {
        this.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Nav
          nombre={this.state.user.displayName}
          avatar={this.state.user.photoURL}
        />
        <div className="container">
          <div className="row">
            <div className="col l6 offset-l3">
              <FeedContent />

              {ReactDOM.createPortal(
                <Modal />,
                document.getElementById("teleport")
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Feed;
