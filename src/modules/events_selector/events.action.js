import {makeSyncLoop, isNotSync} from '../../utils/itemSync';
import constFactory from '../../factories/const';

export const types = constFactory('event');

export const syncEvents = (options) => {
    return (dispatch, getState) => {

        return dispatch(loadEvents(options))
            .then(() => {
                const itemsToSync = getState().events.items.filter(isNotSync);
                return Promise.all(itemsToSync.map(item => dispatch(saveEvent(item))));
            });
    }
};
export const startSyncLoop = makeSyncLoop(syncEvents);

export const loadEvents = options => {
    return {
        url: 'ba/events',
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

export const saveEvent = event =>
    !event.id || event._isNew ?
        createEvent(event) :
        updateEvent(event);

export const updateEvent = event => {
    return {
        url: `ba/events/${event.id}`,
        method: 'put',
        body: event,
        types: {
            start: types.UPDATE_START,
            success: types.UPDATE_SUCCESS,
            noConnection: types.UPDATE_NO_CONNECTION,
            error: types.UPDATE_ERROR
        }
    }
};

export const createEvent = event => {
    const id = event.id || Date.now().toString();
    return {
        url: 'ba/events',
        method: 'post',
        body: {
            ...event,
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

export const deleteEvent = id => (dispatch, getState) => {
    const event = getState().events.items.find(item => item.id === id);

    return dispatch(event._isNew ?
        deleteNewEvent(event.id) :
        deleteExistingEvent(event)
    );
};

const deleteNewEvent = id => {
    return {
        type: types.DELETE_NEW,
        payload: {id}
    }
};

const deleteExistingEvent = event => {
    return {
        url: `ba/events/${event.id}`,
        method: 'put',
        body: {
            ...event,
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