import CONSTS from '../constants'
import { post } from './fetchUtils'

function changeText (data) {
	return {
    type: CONSTS.ACTIONS.CHANGE_TEXT,
    data
  }
}

function closeModal () {
  return {
    type: CONSTS.ACTIONS.CLOSE_MODAL
  }
}

function addService (data) {
  return {
    type: CONSTS.ACTIONS.ADD_SERVICE,
    data
  }
}

function removeService (index) {
  return {
    type: CONSTS.ACTIONS.REMOVE_SERVICE,
    index
  }
}

function errorMessage (error) {
	return {
		type: CONSTS.ACTIONS.ADD_USER_ERROR,
		error
	}
}

function saveUser () {
	return (dispatch, getState) => {
		let item = getState().item
		let error = {}
		Object.keys(item).filter(key => key !== 'user_id' && key !== 'note' && key !== 'birthday').forEach(key => {
			if(!item[key]) {
				error[key] = "This Fields is required"
			}
		})

		if(Object.keys(error).length === 0) {
			return dispatch(post(item))
		} else {
      return dispatch(errorMessage(error))
		}
  }
}

export default { changeText, closeModal, addService, removeService, saveUser }