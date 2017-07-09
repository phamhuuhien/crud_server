function stringsToObject (actions) {
  return actions.trim().split(/\s+/).reduce((obj, action) => {
    obj[action] = action
    return obj
  }, {})
}

export default {
  // nutrient ids from SR28 docs
  // http://www.ars.usda.gov/sp2UserFiles/Place/80400525/Data/SR/SR28/sr28_doc.pdf
  NUTRIENTS: [208, 205, 203, 204, 269, 291, 303],
  LABELS: {
    name : 'Ten khach hang',
    code : 'Ma khach hang',
    address : 'Dia chi',
    phone : 'So dien thoai',
    birthday : 'Ngay sinh',
    numberUsed : 'So nguoi dung',
    note : 'Ghi chu',
    service : 'Dich vu',
    plan : 'Goi cuoc',
    price : 'Gia cuoc',
    expired : 'Thoi gian su dung',
    dialPlan : 'So thue bao'
  },
  CUSTOMER_FIELDS: ['name', 'code', 'address', 'phone', 'birthday', 'numberUsed', 'note'],
  SERVICE_FIELDS: ['service', 'plan', 'price', 'expired', 'dialPlan'],
  SERVICES: ['FTTH', 'ITV'],
  USDA_NUTRIENTS_URL_WITH_APIKEY: 'http://api.nal.usda.gov/ndb/nutrients?' +
    'api_key=uFKMsZENr1ZUZEIDu5CYzA8UeVERm57BEZj2jBK1&max=1500',

  ACTIONS: stringsToObject(`
    REQUEST_NUTRIENTS_DATA
    RECEIVE_NUTRIENTS_DATA
    FILTER_NUTRIENTS_DATA
    SORT_NUTRIENTS_DATA
    OPEN_MODAL
    CLOSE_MODAL
    CHANGE_TEXT
    ADD_SERVICE
    REMOVE_SERVICE
    ADD_USER_SUCCESS
    ADD_USER_ERROR
    EDIT_USER
    UPDATE_USER_SUCCESS

    SET_ERROR_MESSAGE
    RESET_ERROR_MESSAGE
  `)
}
