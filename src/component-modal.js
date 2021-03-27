import React from "react";
import M from "materialize-css";
import FileUpload from "./component-fileUpload";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firebase-storage";

class Modal extends React.Component {
  state = {
    user: {
      photoURL: "",
      displayName: "",
    },
    txt: "",
    uploadValue: 0,
  };
  componentDidMount() {
    M.AutoInit();
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });

      if (!this.state.user.photoURL)
        this.setState({
          user: {
            displayName: user.email.substr(0, user.email.search("@")),
            photoURL:
              "https://cdn.icon-icons.com/icons2/1378/PNG/128/avatardefault_92824.png",
          },
        });
    });
  }

  handleChange = (e) => {
    this.setState({ txt: e.target.value });
  };

  handleUpload = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ uploadValue: percentage });
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        const record = {
          avatar: this.state.user.photoURL,
          nombre: this.state.user.displayName,
          txt: this.state.txt,
          pic: task.snapshot.metadata.fullPath,
        };

        const db = firebase.database();
        const dbRef = db.ref("pictures");
        const newPicture = dbRef.push();
        newPicture.set(record);
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <a
          href="#modal1"
          className="btn-floating btn-large waves-effect waves-light modal-trigger red FAB"
          id="fab"
        >
          <i className="material-icons deep-purple darken-2 pulse">add</i>
        </a>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Posteá en GramApp</h4>
            <div className="chip">
              <img src={this.state.user.photoURL} alt="User" />
              {this.state.user.displayName}
            </div>

            <div className="row">
              <form className="col l12">
                <div className="row">
                  <div className="input-field col s9 l4">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea
                      id="icon_prefix2"
                      className="materialize-textarea"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="icon_prefix2" >Mensaje</label>
                    <FileUpload
                      onUpload={this.handleUpload}
                      uploadValue={this.state.uploadValue}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer" />
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
