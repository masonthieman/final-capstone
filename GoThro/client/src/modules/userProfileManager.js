
import { getToken } from "./authManager";

const apiUrl = "/api/userProfile";

export const getAllUsers = () => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occured while trying to get userProfiles.",
                );
            }
        });
    });
};
export const getUserProfileById = (firebaseUserId) => {

    return fetch(apiUrl + `/${firebaseUserId}`).then((res) => res.json())
};


