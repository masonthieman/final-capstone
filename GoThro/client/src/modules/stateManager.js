
import { getToken } from "./authManager";

const apiUrl = "/api/state";

export const getAllStates = () => {
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
                    "An unknown error occured while trying to get states.",
                );
            }
        });
    });
};

export const getStateById = (stateId) => {

    return fetch(apiUrl + `/${stateId}`).then((res) => res.json())
};
