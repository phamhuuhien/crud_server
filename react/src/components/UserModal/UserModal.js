import React from 'react'
import ReactDOM from 'react-dom';
import { Modal, Button, Form, FormGroup, Col, FormControl, ControlLabel, Table, Panel } from 'react-bootstrap'
import DatePicker from "react-bootstrap-date-picker"

let fields = [
	'name', 'address', 'phone', 'birthday', 'numberUsed', 'note'
]

let extraFields = ['plan', 'price', 'expired']

let labels = {
	name : 'Ten khach hang',
	address : 'Dia chi',
	phone : 'So dien thoai',
	birthday : 'Ngay sinh',
	numberUsed : 'So nguoi dung',
	note : 'Ghi chu',
	service : 'Dich vu',
	plan : 'Goi cuoc',
	price : 'Gia cuoc',
	expired : 'Thoi gian su dung'
}

let services = ['FTTH', 'ITV']

class UserModal extends React.Component {

  constructor (props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleAddButton = this.handleAddButton.bind(this)
  }

  handleOnChange(event) {
  	let object = {}
  	object[event.target.name] = event.target.value
  	this.props.changeText(object)
  }

  handleDateChange(value, formattedValue) {
  	let object = {}
  	object['birthday'] = value
  	console.log(formattedValue)
  	this.props.changeText(object)
  }

  handleAddButton() {
  	this.props.addService({
  		service : ReactDOM.findDOMNode(this.refs.service).value,
  		plan : ReactDOM.findDOMNode(this.refs.plan).value,
  		price : ReactDOM.findDOMNode(this.refs.price).value,
  		expired : ReactDOM.findDOMNode(this.refs.expired).value
  	})
  }

	contentPanel() {
		return (<Panel>
			<FormGroup controlId="formControlsSelect">
      	<ControlLabel>{labels['service']}</ControlLabel>
	      <FormControl componentClass="select" placeholder="select" ref="service">
	      	{services.map(service => <option key={service} value={service}>{service}</option>)}
	      </FormControl>
    	</FormGroup>
    	{extraFields.map(item => (<FormGroup key={item} controlId="formControlsSelect">
      	<ControlLabel>{labels[item]}</ControlLabel>
	      <FormControl type="text" placeholder="text" ref={item}>
	      </FormControl>
    	</FormGroup>))}
    	<Button bsStyle="primary" onClick={this.handleAddButton}>Add</Button>
			{this.tableContent()}</Panel>)
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
	        <th>Delete</th>
	      </tr>
	    </thead>
	    <tbody>
	    {this.props.services.map((item, index) => (
	      <tr>
	        <td>{index + 1}</td>
	        <td>{item['service']}</td>
	        <td>{item['plan']}</td>
	        <td>{item['price']}</td>
	        <td>{item['expired']}</td>
	        <td onClick={() => this.props.removeService(index)}>Delete</td>
	      </tr>
	    	))}
	    </tbody>
	  </Table>)
	}

	switchGUI (field) {
		if(field === 'birthday') {
			return <DatePicker name="birthday" dateFormat="DD/MM/YYYY" value={this.props.birthday} onChange={this.handleDateChange} />
		} else {
			return <FormControl value={this.props[field]} name={field} placeholder={field} onChange={this.handleOnChange}/>
		}
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
					      	{ this.switchGUI(field) }
					      </Col>
					    </FormGroup>))}

		        	{this.contentPanel()}
				    </Form>
		      </Modal.Body>

		      <Modal.Footer>
		        <Button onClick={() => this.props.closeModal()}>Close</Button>
		        <Button bsStyle="primary" onClick={ () => this.props.saveUser()}>Save changes</Button>
		      </Modal.Footer>

	    	</Modal>
	  </div>)
	} 
}

export default UserModal