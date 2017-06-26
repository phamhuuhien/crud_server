import React from 'react'
import NutrientTable from '../../components/NutrientTable'
import UserPage from '../UserPage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { tableActions as actions } from '../../actions'

const NutrientPage = (props) => {
  return (
    <div>
      <h2> Bang bao cao </h2>
      <button onClick={() => props.openModal()}>New</button>
      <NutrientTable {...props} />
      <UserPage />

    </div>
  )
}

const mapStateToProps = ({table}) => table
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(NutrientPage)
