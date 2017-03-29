import {
    TAKE_PICTURE,
    CLEAR_PICTURE
} from './camera.action';

const initialState = {
    picture: null
};

const camera = (state = initialState, action) => {
    switch (action.type) {
        case TAKE_PICTURE:
            return Object.assign({}, state, {
                picture: action.path
            });

        case CLEAR_PICTURE:

            return Object.assign({}, state, {
                picture: null
            });

        default:
            return state;
    }
};

export default camera;