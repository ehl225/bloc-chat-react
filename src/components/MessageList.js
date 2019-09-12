import React, {Component} from 'react';

class MessageList extends Component {
constructor(props) {
	super(props);
		this.state ={
			messages: [],
			displayedMessages: [],
			currentActiveRoom: "",
			newMessage: "",
			currentUsername: "",
			};
this.messagesRef=this.props.firebase.database().ref('messages');
	}
componentDidMount () {
	this.messagesRef.on('child_added', snapshot => {
	const message = snapshot.val();
	message.key = snapshot.key;
	this.setState( {messages: this.state.messages.concat(message)}
);
});
}
componentWillReceiveProps (nextProps) {
this.updateDisplayedMessages (nextProps.activeRoom);
this.setState({currentActiveRoom: nextProps.activeRoom});
this.setState({currentUsername: nextProps.currentUser});
}

addNewMessages(e) {
	e.preventDefault();
	const updateMessage= {
username: (this.props.currentUser ? this.props.currentUser.displayName : 'Guest'),
content: this.state.newMessage,
sentAt: Date(Date.now),
roomId: this.props.activeRoom};
	this.messagesRef.push(updateMessage);
	this.setState({newMessage: ""});
		}
handleNewMessages(e) {
	this.setState({newMessage: e.target.value});
}
updateDisplayedMessages (currentActiveRoom) {
	this.setState ({displayedMessages: this.state.messages.filter(message =>message.roomId=== (currentActiveRoom))});
}
	render () {
return (
<div className="messageInfo">
<section>
	 <h2 className="roomName"> { this.props.activeRoom.name ? this.props.activeRoom.name : '' }</h2>
	<div className="messageData">
	{this.state.displayedMessages
		.map((message, index) =>
		<div className="message" key= {index}>
				<h3 className="user"> {message.username}</h3>
				<div className="content"> {message.content} </div>
				<div className="timestamp"> {message.sentAt} {message.roomId}</div>
		</div>
	)}
	</div>
	</section>
	<section className="sendMessage">
	<form className="sendNewMessage" onSubmit={(e) => this.addNewMessages(e)} >
	<input id="newMessageInput" type="text" value={this.state.newMessage} onChange={(e) => this.handleNewMessages(e)}  placeholder="Type new message" />
	<input id="messageSubmit"  type="submit" value="Send" onChange={(e) => this.updateDisplayedMessages(e)}/>
	</form>
	</section>
</div>
)
}
}
export default MessageList;
