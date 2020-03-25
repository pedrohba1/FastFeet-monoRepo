export function changeTab(newTab) {
    return {
        type: '@user/CHANGE_TAB',
        payload: { newTab },
    };
}
