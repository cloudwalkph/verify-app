import {types} from './hits.actions';
import itemsReducerFactory, {getActiveItems} from '../../factories/itemsReducer';
import statusReducerFactory from '../../factories/statusReducer';
const items = itemsReducerFactory(types);
const status = statusReducerFactory(types);

const INITIAL_STATE = {
    persistVersion: 1
};

export default function hits(state = INITIAL_STATE, action) {
    if (state.persistVersion !== INITIAL_STATE.persistVersion) {
        return hits(INITIAL_STATE, action);
    }

    switch (action.type) {
        case types.LOAD_START:
        case types.LOAD_NO_CONNECTION:
        case types.LOAD_SUCCESS:
        case types.CREATE_START:
        case types.UPDATE_START:
        case types.DELETE_START:
        case types.CREATE_NO_CONNECTION:
        case types.UPDATE_NO_CONNECTION:
        case types.DELETE_NO_CONNECTION:
        case types.CREATE_ERROR:
        case types.UPDATE_ERROR:
        case types.CREATE_SUCCESS:
        case types.UPDATE_SUCCESS:
        case types.DELETE_SUCCESS:
        case types.DELETE_ERROR:
        case types.DELETE_NEW:
            return {
                ...state,
                status: status(state.status, action),
                items: items(state.items, action)
            };
        default:
            return state;
    }
}

export const getActiveHits = state => getActiveItems(state.hits.items);