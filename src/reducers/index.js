const initialState = {
    year: 2020
}

const updateObj = (state, newState) => {
    return {...state, ...newState}
}


const BaseReducer = (state=initialState, action) => {
    switch (action.type){
        case 'INCREASE':
            return updateObj(state, {year: state.year+1})
        case 'DECREASE':
            return updateObj(state, {year: state.year-1})
        case 'SET':
            return updateObj(state, {year: action.payload})
        default:
            return state
    }
}

export default BaseReducer