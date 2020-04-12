export function signInRequest(id) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: {
            id,
        },
    };
}

export function signInSuccess(user) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: {
            user,
        },
    };
}

export function updateProfileRequest(data) {
    return {
        type: '@user/UPDATE_PROFILE_REQUEST',
        payload: { data },
    };
}

export function updateProfileSuccess(profile) {
    return {
        type: '@user/UPDATE_PROFILE_SUCCESS',
        payload: { profile },
    };
}

export function updateProfileFailure(data) {
    return {
        type: '@user/UPDATE_PROFILE_FAILURE',
        payload: { data },
    };
}
