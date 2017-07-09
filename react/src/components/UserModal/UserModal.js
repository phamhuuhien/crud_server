import React from 'react'
import ReactDOM from 'react-dom';
import { Modal, Button, Form, FormGroup, Col, FormControl, ControlLabel, Table, Panel } from 'react-bootstrap'
import DatePicker from "react-bootstrap-date-picker"
import { LABELS, CUSTOMER_FIELDS, SERVICE_FIELDS, SERVICES } from '../../constants'
import './UserModal.styl'

let controlType = {
	name : 'text',
	code : 'text',
	address : 'text',
	phone : 'tel',
	numberUsed : 'number',
	note : 'text',
	plan : 'text',
	price : 'number',
	expired : 'number',
	dialPlan : 'number'
}

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
  		expired : ReactDOM.findDOMNode(this.refs.expired).value,
  		dialPlan : ReactDOM.findDOMNode(this.refs.dialPlan).value
  	})
  	console.log(ReactDOM.findDOMNode(this.refs.expired).value)
  }

	contentPanel() {
		return (<Panel>
			<Col sm={3}>
				<FormGroup controlId="formControlsSelect">
	      	<ControlLabel>{LABELS['service']}</ControlLabel>
		      <FormControl componentClass="select" placeholder="select" ref="service">
		      	{SERVICES.map(service => <option key={service} value={service}>{service}</option>)}
		      </FormControl>
	    	</FormGroup>
    	</Col>
    	{SERVICE_FIELDS.filter(item => item !== 'service').map(item => (<Col sm={item === 'expired' ? 3 : 2}>
    		<FormGroup key={item} controlId="formControlsSelect">
      		<ControlLabel>{LABELS[item]}</ControlLabel>
	      	<FormControl type={controlType[item]} placeholder={item} ref={item}>
	      	</FormControl>
    		</FormGroup>
  		</Col>))}

  		<Col sm={12} className="add-button">
    		<Button bsStyle="primary" onClick={this.handleAddButton}>Add</Button>
    	</Col>
			{this.tableContent()}</Panel>)
	}

	tableContent() {
		return (<Table striped bordered condensed hover>
	    <thead>
	      <tr>
	        <th>#</th>
	        {SERVICE_FIELDS.map(field => (<th>{LABELS[field]}</th>))}
	        <th>Delete</th>
	      </tr>
	    </thead>
	    <tbody>
	    {this.props.services.map((item, index) => (
	      <tr>
	        <td>{index + 1}</td>
	        {SERVICE_FIELDS.map(field => (<td>{item[field]}</td>))}
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
			return <FormControl type={controlType[field]} required value={this.props[field]} name={field} placeholder={field} onChange={this.handleOnChange}/>
		}
	}
	render () {
     return (
	    <div className="static-modal">
		    <Modal bsSize="large" show={this.props.modalIsOpen}>
		      <Modal.Header>
		        <Modal.Title>Modal title</Modal.Title>
		      </Modal.Header>

		      <Modal.Body>
		        <Form horizontal>
		        	{CUSTOMER_FIELDS.map(field =>(<FormGroup key={field} controlId={"formHorizontal" + field } validationState={this.props.error && this.props.error[field] ? "error" : null}>
					      <Col componentClass={ControlLabel} sm={4}>
					        {LABELS[field]}
					      </Col>
					      <Col sm={8}>
					      	{ this.switchGUI(field) }
					      </Col>
					    </FormGroup>))}

		        	{this.contentPanel()}
				    </Form>
		      </Modal.Body>

		      <Modal.Footer>
		        <Button onClick={() => this.props.closeModal()}>Close</Button>
		        <Button bsStyle="primary" type="submit" onClick={ () => this.props.saveUser()}>Save changes</Button>
		      </Modal.Footer>

	    	</Modal>
	  </div>)
	} 
}

export default UserModal