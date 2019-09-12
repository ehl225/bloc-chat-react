import React, {Component} from 'react';

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
	const newRoom = {name: this.state.newRoomName };
	this.roomsRef.push(newRoom);
	this.setState({newRoomName: ""});
}
handleRoomNameChange(e) {
	this.setState({newRoomName: e.target.value});
}
selectRoom(room) {
this.props.setActiveRoom(room);
}
deleteRoom(room) {
	this.roomsRef.child(room.key).remove();
}
render () {
return (
<div>
<section className="createRoom">
	<form className="createRoomForm" onSubmit={(e) => this.createRoom(e)} >
			<input id="newRoomInput" type="text"
value={this.state.newRoomName} onChange={ (e) =>
this.handleRoomNameChange(e)} placeholder="Create Room"/>
			<input type="submit" value="Submit"/>
	</form>
</section>
<section className="roomList">
{this.state.rooms.map((room, index) =>
	<div className="room" key={room.key} onClick = {() =>
this.selectRoom(room.key)}  >
{room.name}
	</div>
	)}
</section>
</div>
);
}
}
export default RoomList;
