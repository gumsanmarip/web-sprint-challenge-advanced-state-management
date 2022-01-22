import axios from 'axios';

//Task List:
//1. Add a thunk action called fetchSmurfs that triggers a loading status display in our application, performs an axios call to retrive smurfs from our server, 
//   saves the result of that call to our state and shows an error if one is made.
//2. Add a standard action that allows us to add new smurf (including the name, nickname, position, summary)
//3. Add a standard action that allows us to set the value of the error message slice of state.

export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';
export const ADD_SMURF = 'ADD_SMURF';
export const SET_ERROR_TEXT = 'SET_ERROR_TEXT';

export const fetchSmurfs = () => (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('http://localhost:3333/smurfs')
        .then(resp => {
            dispatch({type:FETCH_SUCCESS, payload:resp.data});
            dispatch(setErrorText(""));
        })
        .catch(err=> {
            dispatch(setErrorText(err.response.data.Error));
        })
    
}
export const addSmurf = (smurf)=> dispatch => {
    if (!smurf.name || !smurf.nickname || !smurf.position){
        dispatch({type: setErrorText, payload: "Name, Nickname and Position are required"})
    }
    axios.post('http://localhost:3333/smurfs', smurf)
        .then(res=>{
            dispatch({type:ADD_SMURF, payload:{...smurf}})
        })
        .catch(err=>{
            dispatch(setErrorText(err.response.data.Error));
        })
    }

export const setErrorText = (err)=> {
    return({type:SET_ERROR_TEXT, payload:err});
}