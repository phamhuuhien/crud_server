import React from 'react'
import UserModal from '../../components/UserModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { itemActions as actions } from '../../actions'

const UserPage = (props) => {
  return (
    <div>
      <UserModal {...props}/>
    </div>
  )
}

const mapStateToProps = ({item}) => item
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(UserPage)