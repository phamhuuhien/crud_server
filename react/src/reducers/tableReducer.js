import { ACTIONS } from '../constants'

export function listFoodWithNutrients (data) {
  const foods = data

  return foods.reduce((arr, food) => {
    food.nutrients.forEach((nutrient) => {
      nutrient.food = food.name
    })
    return arr.concat(food.nutrients)
  }, [])
}

function handleTableActions (state, action) {
  switch (action.type) {
    case ACTIONS.REQUEST_NUTRIENTS_DATA:
      return { isFetching: true }
    case ACTIONS.RECEIVE_NUTRIENTS_DATA:
      return {
        isFetching: false,
        data: action.data
      }
    case ACTIONS.FILTER_NUTRIENTS_DATA:
      return { filterObject: Object.assign({}, action.filterObject) }
    case ACTIONS.SORT_NUTRIENTS_DATA:
      return {
        sortKey: action.sortKey,
        sortDesc: state.sortKey === action.sortKey ? !state.sortDesc : false
      }
    case ACTIONS.ADD_USER_SUCCESS:
      return {
        data : state.data.concat(action.data)
      }
    case ACTIONS.UPDATE_USER_SUCCESS:
      let userId = action.data[0].user.userId
      let data = state.data.filter(item => item.user.userId != userId)
      return {
        data : data.concat(action.data)
      }
    default:
      return state
  }
}

function tableReducer (state = {}, action) {
  return Object.assign({}, state, handleTableActions(state, action))
}

export default tableReducer
