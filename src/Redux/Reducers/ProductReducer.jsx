import { CREATE_PRODUCT_RED, DELETE_PRODUCT_RED, GET_PRODUCT_RED, UPDATE_PRODUCT_RED } from "../Constants"

export default function ProductReducer(state = [], action) {
    switch (action.type) {
        case CREATE_PRODUCT_RED:
            return [...state, action.payload]

        case GET_PRODUCT_RED:
            return action.payload

        case UPDATE_PRODUCT_RED:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].status = action.payload.status
            return state

        case DELETE_PRODUCT_RED:
            return state.filter(x=>x.id===action.payload.id) 
            
        default:
            return state    
    }
}
