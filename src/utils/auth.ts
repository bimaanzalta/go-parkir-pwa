// src/utils/auth.ts
export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const setUser = (user: { username: string; loggedIn: boolean }) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const clearUser = () => {
    localStorage.removeItem("user");
};
