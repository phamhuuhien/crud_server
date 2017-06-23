import React from 'react'
import { Modal, Button, Form, FormGroup, Col, FormControl, ControlLabel, Table, Panel } from 'react-bootstrap'

let fields = [
	'name', 'address', 'phone', 'birthday', 'numberUsed', 'note'
]

let labels = {
	name : 'Ten khach hang',
	address : 'Dia chi',
	phone : 'So dien thoai',
	birthday : 'Ngay sinh',
	numberUsed : 'So nguoi dung',
	note : 'Ghi chu'
}
class UserModal extends React.Component {

	contentPanel() {
		return
		(<Panel>
			{this.tableContent()}
		</Panel>)
	}

	tableContent() {
		return (<Table striped bordered condensed hover>
	    <thead>
	      <tr>
	        <th>#</th>
	        <th>Dich vu</th>
	        <th>Goi cuoc</th>
	        <th>Gia cuoc</th>
	        <th>Thoi gian su dung</th>
	      </tr>
	    </thead>
	    <tbody>
	      <tr>
	        <td>1</td>
	        <td>Mark</td>
	        <td>Otto</td>
	        <td>@mdo</td>
	        <td>@mdo</td>
	      </tr>
	      <tr>
	        <td>2</td>
	        <td>Jacob</td>
	        <td>Thornton</td>
	        <td>@fat</td>
	        <td>@mdo</td>
	      </tr>
	      <tr>
	        <td>3</td>
	        <td colSpan="2">Larry the Bird</td>
	        <td>@twitter</td>
	        <td>@mdo</td>
	      </tr>
	    </tbody>
	  </Table>)
	}

	render () {
     return (
	    <div className="static-modal">
		    <Modal show={this.props.modalIsOpen}>
		      <Modal.Header>
		        <Modal.Title>Modal title</Modal.Title>
		      </Modal.Header>

		      <Modal.Body>
		        <Form horizontal>
		        	{fields.map(field =>(<FormGroup key={field} controlId={"formHorizontal" + field }>
					      <Col componentClass={ControlLabel} sm={2}>
					        {labels[field]}
					      </Col>
					      <Col sm={10}>
					        <FormControl type={field} placeholder={field} />
					      </Col>
					    </FormGroup>))}

		        	{this.contentPanel()}
				    </Form>
		      </Modal.Body>

		      <Modal.Footer>
		        <Button onClick={() => this.props.closeModal()}>Close</Button>
		        <Button bsStyle="primary">Save changes</Button>
		      </Modal.Footer>

	    	</Modal>
	  </div>)
	} 
}

export default UserModal