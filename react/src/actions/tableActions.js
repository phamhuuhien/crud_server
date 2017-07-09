import CONSTS from '../constants'
import { fetchDispatch, getUser } from './fetchUtils'

const apiProps = {
  url: './services',
  types: {
    request: CONSTS.ACTIONS.REQUEST_NUTRIENTS_DATA,
    receive: CONSTS.ACTIONS.RECEIVE_NUTRIENTS_DATA
  }
}

function shouldFetchData ({table}) {
  return (!table.data || !table.isFetching)
}

function fetchData () {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

function filterBy (filterObject) {
  return {
    type: CONSTS.ACTIONS.FILTER_NUTRIENTS_DATA,
    filterObject
  }
}

function sortBy (sortKey) {
  return {
    type: CONSTS.ACTIONS.SORT_NUTRIENTS_DATA,
    sortKey
  }
}

function openModal () {
  return {
    type: CONSTS.ACTIONS.OPEN_MODAL
  }
}

function editUser(user) {
  return (dispatch, getState) => dispatch(getUser(user))
}

function exportExcel() {
  window.location.href = "./excel"
}

export default { fetchData, filterBy, sortBy, openModal, editUser, exportExcel }
