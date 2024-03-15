// function EmployeeReducer(state = initialState, action) {
//     console.log(action.type)
//     switch (action.type) {
//         case 'LOGIN_SUCCESS':
//             return {
//                 ...state,
//                 isLoggedIn: true,
//                 eid: action.payload.eid,
//                 isProjectLead : action.payload.isProjectLead
//             };
//         case "LOGOUT":
//             return initialState
//         default:
//             return state;
//     }
// }

import { combineReducers } from 'redux';
import auth from './auth';

export default combineReducers({
    auth
});
