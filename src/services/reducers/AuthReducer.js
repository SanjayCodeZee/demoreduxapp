import { USER_LOGIN } from "../reduxConstant";

const initialValues = {
    user : false
}

export const authReducer = (state = initialValues, action) =>{
    switch (action.type) {
        case USER_LOGIN:
            return { user: action.payload};       
        default: return state;
    }
}