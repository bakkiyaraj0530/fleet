export const LOGIN_SUBMIT = 'users/LOGIN_SUBMIT'
export const SAVE_USERDATAILS = 'users/SAVE_USERDATAILS'
export const CREATE_LEAVE_REQUEST = 'users/CREATE_LEAVE_REQUEST'
export const CANCEL_LEAVE_REQUEST = 'users/CANCEL_LEAVE_REQUEST'
export const UPDATE_STATUS = 'users/UPDATE_STATUS';


const initialState = {
  payload: '',
  email: '',
  password: ''
}

export default (state = initialState, action) => {
  
  if(action.type == CREATE_LEAVE_REQUEST) {
    let appString = {};
    appString = action.reqData;
    appString.requestId = state.payload && state.payload[1].requestdetails.length + 1;
    appString.username = state.payload && state.payload[0].username;
    appString.uid = state.payload && state.payload[0].uid;
    state.payload && state.payload[1].requestdetails.push(appString)
  }

  switch (action.type) {
    case LOGIN_SUBMIT:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      }
    case SAVE_USERDATAILS:
      return {
        ...state,
        payload: action.payload,
      }
    case CANCEL_LEAVE_REQUEST:
      return {
        ...state,
        id: action.id,
      }
    case CREATE_LEAVE_REQUEST:
      return state;
        // id: action.reqData,
      // }
    case UPDATE_STATUS:
      return state
    // case INCREMENT:
    //   return {
    //     ...state,
    //     count: state.count + 1,
    //     isIncrementing: !state.isIncrementing
    //   }

    // case DECREMENT_REQUESTED:
    //   return {
    //     ...state,
    //     isDecrementing: true
    //   }

    // case DECREMENT:
    //   return {
    //     ...state,
    //     count: state.count - 1,
    //     isDecrementing: !state.isDecrementing
    //   }

    default:
      return state
  }
}

export const updateStatus = status => {
  return dispatch => {
    dispatch({
      type: UPDATE_STATUS,
      status
    })
  }
}

export const loginSubmit = payload => {
  return dispatch => {
    dispatch({
      type: LOGIN_SUBMIT,
      payload
    })
  }
}

export const saveUser = (payload) => {
  return dispatch => {
    dispatch({
      type: SAVE_USERDATAILS,
      payload
    })
  }
}

export const cancelleave = (id) => {
  return dispatch => {
    dispatch({
      type: CANCEL_LEAVE_REQUEST,
      id: id,
    })
  }
}
export const applyLeave = (reqData) => {
  return dispatch => {
    dispatch({
      type: CREATE_LEAVE_REQUEST,
      reqData,
    })
  }
}

// export const increment = () => {
//   return dispatch => {
//     dispatch({
//       type: INCREMENT_REQUESTED
//     })

//     dispatch({
//       type: INCREMENT
//     })
//   }
// }

// export const incrementAsync = () => {
//   return dispatch => {
//     dispatch({
//       type: INCREMENT_REQUESTED
//     })

//     return setTimeout(() => {
//       dispatch({
//         type: INCREMENT
//       })
//     }, 3000)
//   }
// }

// export const decrement = () => {
//   return dispatch => {
//     dispatch({
//       type: DECREMENT_REQUESTED
//     })

//     dispatch({
//       type: DECREMENT
//     })
//   }
// }

// export const decrementAsync = () => {
//   return dispatch => {
//     dispatch({
//       type: DECREMENT_REQUESTED
//     })

//     return setTimeout(() => {
//       dispatch({
//         type: DECREMENT
//       })
//     }, 3000)
//   }
// }
