export const getUserToken = () => {
     return localStorage.getItem("USER_TOKEN");
};

export const setUserToken = (value: string) => {
     return localStorage.setItem("USER_TOKEN", value);
};

export const removeUserToken = () => {
     return localStorage.removeItem("USER_TOKEN");
};

export const getMentorToken = () => {
     return localStorage.getItem("MENTOR_TOKEN");
};

export const setMentorToken = (value: string) => {
     return localStorage.setItem("MENTOR_TOKEN", value);
};

export const removeMentorToken = () => {
     return localStorage.removeItem("MENTOR_TOKEN");
};
