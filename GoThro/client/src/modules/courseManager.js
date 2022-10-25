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

export const addCourse = (course) => {
    return getToken().then((token) => {
      return fetch(baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      }).then((resp) => {
       if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else if (!resp.ok) {
          throw new Error(
            "An unknown error occurred while trying to save a new course.",
          );
        }
      });
    });
  };