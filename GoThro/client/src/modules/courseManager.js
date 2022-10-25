import {getToken} from "./authManager";

const baseUrl = '/api/course'

export const getAllCourses = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error(
              "An unknown error occurred....."
            )
          }
      })
    })
}