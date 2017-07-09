import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import NutrientTable from '../../components/NutrientTable'
import UserPage from '../UserPage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { tableActions as actions } from '../../actions'

const NutrientPage = (props) => {
  return (
    <div>
      <h2> Bang bao cao </h2>
      <ButtonToolbar>
	      <Button bsStyle="primary" onClick={() => props.openModal()}>New</Button>
	      <Button bsStyle="success" onClick={() => props.exportExcel()}>Export</Button>
      </ButtonToolbar>
      <NutrientTable {...props} />
      <UserPage />

    </div>
  )
}

const mapStateToProps = ({table}) => table
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(NutrientPage)
