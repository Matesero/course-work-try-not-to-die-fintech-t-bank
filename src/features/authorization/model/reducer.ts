export type State = {
    isEditing: boolean;
    isUpload?: boolean;
    isLoading?: boolean;
    errors?: { [key: string]: string };
    error?: string;
};

export type Action =
    | { type: 'switchIsEditing' }
    | { type: 'cancelEditing' }
    | { type: 'errorForm'; payload: { [key: string]: string } }
    | { type: 'startUpload' }
    | { type: 'finishUpload' }
    | { type: 'errorResponse' };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'switchIsEditing':
            return { ...state, isEditing: !state.isEditing };

        case 'errorForm':
            return state.isEditing
                ? { ...state, isEditing: true, errors: action.payload }
                : state;

        case 'startUpload':
            return state.isEditing
                ? { ...state, isUpload: true, ...state }
                : state;

        case 'finishUpload':
            return state.isUpload || state.isLoading
                ? { ...state, isEditing: false }
                : state;

        case 'errorResponse':
            return state.isUpload
                ? {
                      ...state,
                      error: 'Ошибка. Попробуйте еще раз',
                      isUpload: false,
                  }
                : state;
    }

    return state;
};
