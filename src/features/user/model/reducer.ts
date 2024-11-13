type State = {
    isEditing: boolean;
    isUpload?: boolean;
    errors?: { [key: string]: string };
    error?: string;
};

type Action =
    | { type: 'switchIsEditing' }
    | { type: 'cancel' }
    | { type: 'errorForm'; payload: { [key: string]: string } }
    | { type: 'startUpload' }
    | { type: 'finishUpload' }
    | { type: 'errorUpload' };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'switchIsEditing':
            return { isEditing: !state.isEditing };

        case 'errorForm':
            return state.isEditing
                ? { isEditing: true, errors: action.payload }
                : state;

        case 'startUpload':
            return state.isEditing ? { isUpload: true, ...state } : state;

        case 'finishUpload':
            return state.isUpload ? { isEditing: false } : state;

        case 'errorUpload':
            return state.isUpload && state.isEditing
                ? { error: 'Ошибка загрузки. Попробуйте еще раз', ...state }
                : state;
    }

    return state;
};
