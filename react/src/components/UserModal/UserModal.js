import React from 'react'
import Modal from 'react-modal';

class UserModal extends React.Component {

	render () {
    return <Modal
	  isOpen={this.props.modalIsOpen}
	  contentLabel="Modal"
	>
	  <h1>Modal Content</h1>
	  <p>Etc.</p>
	</Modal>
  	}
}

export default UserModal