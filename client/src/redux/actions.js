import axios from "axios"

export function savePlace(payload){
    return{
        type:'SAVE_PLACE',
        payload
    }
}

export function saveUser(){
    return{
        type:'SAVE_USER',
        payload:JSON.parse(localStorage.getItem("user"))
    }
}

export function logOutUser(){
    return{
        type:'LOGOUT_USER',
        payload : []
    }
}

export  function  getResults(){

    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/form/results`);
        return dispatch({
            type: 'GET_RESULTS',
            payload: json.data
        })
    }
}

export  function  getResultsUser(payload){

    return async function (dispatch) {
        var json = await axios.post(`http://localhost:3001/results`, payload);
        return dispatch({
            type: 'GET_RESULTS',
            payload: json.data
        })
    }
}







