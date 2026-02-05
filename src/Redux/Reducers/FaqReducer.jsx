import { CREATE_FAQ_RED, DELETE_FAQ_RED, GET_FAQ_RED, UPDATE_FAQ_RED } from "../Constants"

export default function FaqReducer(state = [], action) {
    switch (action.type) {
        case CREATE_FAQ_RED:
            return [...state, action.payload]

        case GET_FAQ_RED:
            return action.payload

        case UPDATE_FAQ_RED:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].status = action.payload.status
            return state

        case DELETE_FAQ_RED:
            return state.filter(x=>x.id===action.payload.id) 
            
        default:
            return state    
    }
}
