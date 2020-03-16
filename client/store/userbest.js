import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GOT_USERBEST = 'GOT_USERBEST';

/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */
const gotUserBest = userBest => ({type: GOT_USERBEST, userBest});

/**
 * THUNK CREATORS
 */
export const getUserBest = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/userbests/${id}`);
    dispatch(gotUserBest(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_USERBEST:
      return action.userBest;
    default:
      return state;
  }
}
