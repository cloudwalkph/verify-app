import {makeSyncLoop, isNotSync} from '../../utils/itemSync';
import constFactory from '../../factories/const';

export const types = constFactory('hit');

export const syncHits = (options, locationId) => {
    return (dispatch, getState) => {

        return dispatch(loadHits(options, locationId))
            .then(() => {
                const itemsToSync = getState().hits.items.filter(isNotSync);
                return Promise.all(itemsToSync.map(item => dispatch(saveHit(item, 0, locationId))));
            });
    }
};
export const startSyncLoop = makeSyncLoop(syncHits);

export const loadHits = (options, locationId) => {
    return {
        url: `ba/locations/${locationId}/hits`,
        method: 'get',
        meta: {
            ...options
        },
        types: {
            start: types.LOAD_START,
            success: types.LOAD_SUCCESS,
            noConnection: types.LOAD_NO_CONNECTION,
            error: types.LOAD_ERROR
        }
    };
};

export const saveHit = (hit, projectId, locationId) =>
    !hit.id || hit._isNew ?
        createHit(hit, projectId, locationId) :
        updateHit(hit);

export const updateHit = hit => {
    return {
        url: `ba/hits/${hit.id}`,
        method: 'put',
        body: hit,
        types: {
            start: types.UPDATE_START,
            success: types.UPDATE_SUCCESS,
            noConnection: types.UPDATE_NO_CONNECTION,
            error: types.UPDATE_ERROR
        }
    }
};

export const createHit = (hit, projectId, locationId) => {
    const id = hit.id || Date.now().toString();
    return {
        url: `ba/events/${projectId}/locations/${locationId}`,
        method: 'post',
        body: {
            ...hit,
            _isNew: true,
            id
        },
        meta: {
            id
        },
        types: {
            start: types.CREATE_START,
            success: types.CREATE_SUCCESS,
            noConnection: types.CREATE_NO_CONNECTION,
            error: types.CREATE_ERROR
        }
    };
};

export const deleteHit = id => (dispatch, getState) => {
    const hit = getState().hits.items.find(item => item.id === id);

    return dispatch(hit._isNew ?
        deleteNewHit(hit.id) :
        deleteExistingHit(hit)
    );
};

const deleteNewHit = id => {
    return {
        type: types.DELETE_NEW,
        payload: {id}
    }
};

const deleteExistingHit = hit => {
    return {
        url: `ba/hits/${hit.id}`,
        method: 'put',
        body: {
            ...hit,
            isDeleted: true
        },
        types: {
            start: types.DELETE_START,
            success: types.DELETE_SUCCESS,
            noConnection: types.DELETE_NO_CONNECTION,
            error: types.DELETE_ERROR
        }
    };
};