import React, {Component} from 'react';
//import firebase from 'firebase';

class RoomList extends Component {
constructor(props) {
	super(props);
		this.state= {
		rooms: [],
		newRoomName: "",
		};
	this.roomsRef = this.props.firebase.database().ref('rooms');
	}
componentDidMount () {
	this.roomsRef.on('child_added', snapshot => {
	const room = snapshot.val();
	room.key = snapshot.key;
	this.setState( {rooms: this.state.rooms.concat(room)})
});
}

createRoom(e) {
	e.preventDefault();
	const newRoom = {name: this.state.newRoomName,
};
	this.roomsRef.push(newRoom);
	this.setState({newRoomName: ""});
	console.log("This worked");
}
handleRoomChange(e) {
	this.setState({newRoomName: e.target.value});
}

render () {
return (
<div>
<section className="createRoom"> 
	<form className="createRoomForm" onSubmit={(e) => this.createRoom(e)}>
			<h1 className="formTitle">Create a room</h1>
			<label className="roomName">Room Name</label>
			<input id="newRoomInput" type="text"
value={this.state.newRoomName} onChange={ (e) => this.handleRoomChange(e)} />
			<input type="submit" value="Submit"
//onSubmit={ (e) => this.createRoom(e)}
/>
	</form>
</section>
<section className="roomList">
{this.state.rooms.map((room, index) => 
	<div className="room" key={index}> {room.name}
	</div>
	)}
</section>
</div>
);
}
}
export default RoomList;

