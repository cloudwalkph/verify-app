export default function constFactory(entityName) {

    const ENTITY = entityName.toUpperCase();

    return {
        LOAD_START: `LOAD_${ENTITY}S_START`,
        LOAD_SUCCESS: `LOAD_${ENTITY}S_SUCCESS`,
        LOAD_NO_CONNECTION: `LOAD_${ENTITY}S_NO_CONNECTION`,
        LOAD_ERROR: `LOAD_${ENTITY}S_ERROR`,

        CREATE_START: `CREATE_${ENTITY}_START`,
        CREATE_SUCCESS: `CREATE_${ENTITY}_SUCCESS`,
        CREATE_NO_CONNECTION: `CREATE_${ENTITY}_NO_CONNECTION`,
        CREATE_ERROR: `CREATE_${ENTITY}_ERROR`,

        UPDATE_START: `UPDATE_${ENTITY}_START`,
        UPDATE_SUCCESS: `UPDATE_${ENTITY}_SUCCESS`,
        UPDATE_NO_CONNECTION: `UPDATE_${ENTITY}_NO_CONNECTION`,
        UPDATE_ERROR: `UPDATE_${ENTITY}_ERROR`,

        DELETE_START: `DELETE_${ENTITY}_START`,
        DELETE_SUCCESS: `DELETE_${ENTITY}_SUCCESS`,
        DELETE_NO_CONNECTION: `DELETE_${ENTITY}_NO_CONNECTION`,
        DELETE_ERROR: `DELETE_${ENTITY}_ERROR`,

        DELETE_NEW: `DELETE_NEW_${ENTITY}`
    }
}