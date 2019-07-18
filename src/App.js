import React, {Component} from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

//The core Firebase JS SDK is always required and must be 
//listed first 
//<script src = 
//"https://www.gstatic.com/firebasejs/6.3.0/firebase-app.js" >
//</script>
//TODO: Add SKDs for Firebase products that you want to use 
// https://firebase.google.com/docs/web/setup#config-web-app

//Your web app's Firebase configuration
var firebaseConfig = {
//	src: 
//"https://www.gstatic.com/firebasejs/6.3.0/firebase-app.js",
	apiKey: "AIzaSyBxLjymw75SqIlvQUz9XFs5SwdviM1P7nk", 
	authDomain: "bloc-chat-react-ehl.firebaseapp.com", 
	databaseURL: "https://bloc-chat-react-ehl.firebaseio.com",
	projectId: "bloc-chat-react-ehl", 
	storageBucket: "",
	messagingSenderId: "1074466121746", 
	appId: "1:1074466121746:web:7b3fe1edd994fcb5"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);


class App extends Component {
render () {
 return (
    <div className="App">
      <header className="App-header">
	<h1>Bloc Chat</h1>
      </header>
	<main>
		<RoomList firebase= {firebase} />
    	</main>
	</div>

  );
}
}

export default App;
