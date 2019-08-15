import React, {Component} from 'react';

class SetUsername extends Component {
  constructor(props) {
    super(props);
  }
componentDidMount () {
  this.props.firebase.auth().onAuthStateChanged(user => {
    this.props.setUser(user);
  });
}
handleSignIn(e) {
  var provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup(provider);
  }
  handleSignOut(e) {
    this.props.firebase.auth().signOut();
}

render () {
  return (
    <div className="loginInfo">
    <div className="userInfo"
    //onChange= {(e) => this.handleDisplayName(e)}
    >
   Current User: {this.props.currentUser ?  this.props.currentUser.displayName : "guest" }
  </div>
    <button className="signIn" onClick = {(e) => this.handleSignIn(e)}
    //onChange= {(user) => this.props.setUser(user)}
    >
    Sign In
    </button>
    <button className="signOut" onClick= {(e) => this.handleSignOut(e)}>
    Sign Out
    </button>
    </div>
  )
  }
}
export default SetUsername;
