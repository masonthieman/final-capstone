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

export const addPlayedCourse = (course) => {
  return getToken().then((token) => {
    return fetch(baseUrl + `/played/${course.id}`, {
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
          "An unknown error occurred while trying to save a played course.",
        );
      }
    });
  });
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

  export const updateCourse = (course) => {
    return getToken().then((token) => {
      return fetch(baseUrl + `/${course.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to save a new course.",
          );
        }
      });
    });
  };

  export const getCourseById = (id) => {
    return getToken().then((token) => {
      return fetch(baseUrl + `/${id}`, {
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
  export const deleteCourse = (id) => {
    return getToken().then((token) => {
      return fetch(baseUrl + `/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      }).then((resp) => {
        if (resp.ok) {
          return
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to save a new course.",
          );
        }
      });
    });
  };

  export const deletePlayedCourse = (courseId) => {
    return getToken().then((token) => {
      return fetch(baseUrl + `/played/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseId),
      }).then((resp) => {
        if (resp.ok) {
          return
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to save a new course.",
          );
        }
      });
    });
  };