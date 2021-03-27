import React from "react";
import insta from "./instashot.png";
import firebase from "firebase/app";
import "firebase/auth";

class Home extends React.Component {
  state = {
    user: null,
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
      if (this.state.user) {
        this.props.history.push("/feed");
      }
    });
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth().signInWithPopup(provider).then((result) => {
        this.props.history.push("/feed");
      })
      .catch((error) => console.log(error.code));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container vh100">
          <div className="row ">
            <div className="col m4 l5 offset-l1 off">
              <img alt="" src={insta} />
            </div>
            <div className="col offset-s2 s8 m4 l3 top120">
              <div className="card">
                <div className="card-content center">
                  <img
                    alt="Itsjuanit"
                    className="circle homePic"
                    src="https://instagram.fmdz4-1.fna.fbcdn.net/v/t51.2885-19/10520390_585345061591998_1231728696_a.jpg?_nc_ht=instagram.fmdz4-1.fna.fbcdn.net&_nc_ohc=0WGSjmvodrwAX_CM6al&ccb=7-4&oh=72fcff62f251f1f09836b1df29304f7f&oe=608A3933&_nc_sid=7bff83"
                  />
                  <p>
                    Bienvenidos a <strong>GramApp</strong>, esta app esta
                    creada con React.js, Firebase y Materialize.
                  </p>
                </div>
                <div className="card-action center-align">
                  <button
                    className="deep-purple darken-2 btn"
                    onClick={this.handleAuth}
                  >
                    Iniciar sesión
                  </button>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
