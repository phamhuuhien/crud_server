import CONSTS from '../constants'

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

export default { changeText, closeModal, addService, removeService }