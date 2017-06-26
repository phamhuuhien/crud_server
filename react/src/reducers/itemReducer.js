import { ACTIONS } from '../constants'

let itemDefault = {
	name : '',
	address : '',
	phone : '',
	birthday : '',
	numberUsed : '',
	note : '',
	services : []
}
// Updates error message to notify about the failed fetches.
function handleChange (state = {}, action) {
  const { type, data } = action

	switch (type) {
		case ACTIONS.CHANGE_TEXT:
	  	return data
    case ACTIONS.OPEN_MODAL:
      return {
        modalIsOpen : true
      }
    case ACTIONS.CLOSE_MODAL:
      return {
        modalIsOpen : false
      }
    case ACTIONS.ADD_SERVICE:
    	return {
    		services : state.services.concat(data)
    	}
    case ACTIONS.REMOVE_SERVICE:
    	state.services.splice(action.index, 1)
    	return {
    		services : state.services.slice(0)
    	}

  return state
  }
}

function itemReducer (state = itemDefault, action) {
  return Object.assign({}, state, handleChange(state, action))
}

export default itemReducer