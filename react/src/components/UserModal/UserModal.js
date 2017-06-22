import React from 'react'
import Modal from 'react-modal';

class UserModal extends React.Component {

	render () {
    return <Modal
	  isOpen={this.props.modalIsOpen}
	  contentLabel="Modal"
	>
	  <h1>Modal Content</h1>
	  <div>
	  <form action="/action_page.php">
	    <label for="fname">First Name</label>
	    <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

	    <label for="lname">Last Name</label>
	    <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>

	    <label for="country">Country</label>
	    <select id="country" name="country">
	      <option value="australia">Australia</option>
	      <option value="canada">Canada</option>
	      <option value="usa">USA</option>
	    </select>
	  
	    <input type="submit" value="Submit"/>
	  </form>
		</div>
	</Modal>
  	}
}

export default UserModal