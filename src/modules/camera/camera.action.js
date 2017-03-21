export const TAKE_PICTURE = 'TAKE_PICTURE';
export const CLEAR_PICTURE = 'CLEAR_PICTURE';

export const takePicture = (path) => (
    {
        type: TAKE_PICTURE,
        path
    }
);

export const clearPicture = () => (
    {
        type: TAKE_PICTURE,
    }
);