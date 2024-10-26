// src/auth.ts
import { ref, reactive } from "vue";

const isAuthenticated = ref(false);
const userRole = ref<string | null>(null);
const userData = ref<any | null>(null);

// Initialize authentication and role from localStorage
const savedUser = localStorage.getItem("user");
if (savedUser) {
    const user = JSON.parse(savedUser);
    userData.value = user
    if (user)
        isAuthenticated.value = true;
    userRole.value = user.role;
}

export const useAuth = () => {
    const login = (user: { id: string; email: string; username: string; role: string; loggedIn: boolean }) => {
        isAuthenticated.value = true;
        userData.value = user; // Save user data in state
        localStorage.setItem("user", JSON.stringify(user)); // Save user data in localStorage
    };

    const logout = () => {
        isAuthenticated.value = false;
        userData.value = null;
        localStorage.removeItem("user");
    };

    return { isAuthenticated, userData, login, logout, userRole };
};