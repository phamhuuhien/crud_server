import { ACTIONS } from '../constants'

let itemDefault = {
	user_id : undefined,
	name : '',
	code : '',
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
    case ACTIONS.UPDATE_USER_SUCCESS:
    case ACTIONS.ADD_USER_SUCCESS:
    case ACTIONS.CLOSE_MODAL:
      return {
        ...itemDefault,
        modalIsOpen : false,
        error : null
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
    case ACTIONS.EDIT_USER:
      return {
        ...action.user,
        birthday: action.user.birthday ? convertToIsoDate(action.user.birthday) : "",
        modalIsOpen : true
      }
    case ACTIONS.ADD_USER_ERROR:
    	return {
    		error : action.error
    	}

  return state
  }
}

function itemReducer (state = itemDefault, action) {
  return Object.assign({}, state, handleChange(state, action))
}

function convertToIsoDate(dateString) {
  let tzoffset = (new Date()).getTimezoneOffset() * 60000;
  let date = new Date(dateString)
  let localISOTime = (new Date(date.getTime() - tzoffset)).toISOString().slice(0,-1);
  return localISOTime
}

export default itemReducer