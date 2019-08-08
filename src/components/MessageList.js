import React, {Component} from 'react';

class MessageList extends Component {
constructor(props) {
	super(props);
		this.state ={
			messages: [],
			displayedMessages: [],
			currentActiveRoom: ""
			};
this.messagesRef=this.props.firebase.database().ref('messages');
	}
componentDidMount () {
	this.messagesRef.on('child_added', snapshot => {
	const message = snapshot.val();
	message.key = snapshot.key;
	this.setState( {messages: this.state.messages.concat(message)})
	});
}
componentWillReceiveProps (nextProps) {
	this.updateDisplayedMessages (nextProps.activeRoom);
console.log("nextProps" + nextProps.activeRoom);
this.setState({currentActiveRoom: nextProps.activeRoom})
console.log("stillNextProps" + this.state.currentActiveRoom);
}
updateDisplayedMessages (currentActiveRoom) {
	if (!currentActiveRoom) {
		return;
	}
//	var newMessages = ;
	this.setState ({displayedMessages: this.state.messages.filter(message => message.roomId === parseInt( currentActiveRoom))});
console.log("currentActiveRoom" + this.state.currentActiveRoom);
}
render () {
return (
<div>
	<section>
	<ul className="messageData">
	{this.state.displayedMessages.map((message, index) =>
		<div className="message" key= {index}>
				<div>User: {message.username}</div>
				<div> {message.content} </div>
				<div>{message.sentAt}</div>
		</div>
	)}
	</ul>
	</section>
</div>
)
}
}
export default MessageList;
