import axios from 'axios';
import history from '../history';
import Swal from 'sweetalert2';

/**
 * ACTION TYPES
 */
const TRIED_CHALLENGE = 'TRIED_CHALLENGE';

/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */
const triedChallenge = result => ({type: TRIED_CHALLENGE, result});

/**
 * THUNK CREATORS
 */
export const tryChallenge = (id, code) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/challenges/${id}`, {code});
    dispatch(triedChallenge(data));
  } catch (err) {
    Swal.fire({
      title: 'Challenge Submission Failed',
      text: 'Your submission has an error. Fix it and try again.',
      icon: 'warning',
      timer: 5000,
      timerProgressBar: true,
      toast: true,
      position: 'top-end'
    });
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case TRIED_CHALLENGE:
      return action.result;
    default:
      return state;
  }
}
