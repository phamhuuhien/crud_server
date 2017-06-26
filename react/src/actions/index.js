import { ACTIONS } from '../constants'
import tableActions from './tableActions'
import itemActions from './itemActions' 

function resetErrorMessage () {
  return { type: ACTIONS.RESET_ERROR_MESSAGE }
}

export {
  tableActions,
  itemActions,
  resetErrorMessage
}
