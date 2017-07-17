import CONSTS from '../constants'
import { fetchDispatch, getUser } from './fetchUtils'
import axios from 'axios'
import Alert from 'react-s-alert';

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

function importExcel() {
  let data = new FormData()
  data.append('file', document.getElementById('file').files[0])
  return (dispatch) => {
    axios.post('/import', data)
      .then(response => Alert.success('Import success', {
            position: 'top-right',
            effect: 'bouncyflip'
        }))
      .catch(error => Alert.error('Import error', {
            position: 'top-right',
            effect: 'bouncyflip'
        }))
  }
}

export default { fetchData, filterBy, sortBy, openModal, editUser, exportExcel, importExcel }