import React, {Component} from 'react';

class MessageList extends Component {
constructor(props) {
	super(props);
		this.state ={
			messages: [],
			newMessage: "",
			};
this.messagesRef=this.props.firebase.database().ref('messages');
	}
componentDidMount () {
	this.messagesRef.on('child_added', snapshot => {
	const message = snapshot.val();
	message.key = snapshot.key;
	this.setState( {messages: 
this.state.messages.concat(message)})
});
}


render () {
return (
<div>
	<header className="currentActiveRoom">
		{this.state.activeRoom}
	</header>
	<ul> {this.state.messages} </ul>
</div>
)
}
}
export default MessageList;
