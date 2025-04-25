import api from "./api";

const authService = {
    /**
     * Register user baru
     * @param {Object} userData - Data user { name, email, password }
     * @returns {Promise<Object>} - { success, data, message, error }
     */
    async register(userData) {
        try {
            if (!userData.name || !userData.email || !userData.password) {
                return {
                    success: false,
                    message: "Semua field wajib diisi",
                };
            }

            const response = await api.post("/auth/register", userData);

            return {
                success: true,
                data: response.data,
                message: response.data.message || "Registrasi berhasil",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Registrasi gagal",
                error: error.response?.data,
            };
        }
    },

    /**
     * Login user dan dapatkan JWT token
     * @param {Object} credentials - { email, password }
     * @returns {Promise<Object>} - { success, data, message, error }
     */
    async login(credentials) {
        try {
            if (!credentials.email || !credentials.password) {
                return {
                    success: false,
                    message: "Email dan password wajib diisi",
                };
            }

            const response = await api.post("/auth/login", credentials);

            // Jika login berhasil dan ada token, simpan di localStorage
            if (response.data.token) {
                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        token: response.data.token,
                        email: credentials.email,
                    })
                );
            }

            return {
                success: true,
                data: response.data,
                message: response.data.message || "Login berhasil",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login gagal",
                error: error.response?.data,
            };
        }
    },

    /**
     * Logout user (dummy)
     * @returns {Object} - { success, message }
     */
    logout() {
        localStorage.removeItem("auth");
        return {
            success: true,
            message: "Logout berhasil",
        };
    },

    /**
     * Mendapatkan data user yang sedang login
     * @returns {Object|null} - User data atau null jika tidak ada
     */
    getCurrentUser() {
        const authData = localStorage.getItem("auth");
        return authData ? JSON.parse(authData) : null;
    },

    /**
     * Memeriksa apakah user sudah login
     * @returns {boolean}
     */
    isAuthenticated() {
        const user = this.getCurrentUser();
        return !!user?.token;
    },

    /**
     * Mendapatkan token JWT
     * @returns {string|null} - Token atau null jika tidak ada
     */
    getToken() {
        const user = this.getCurrentUser();
        return user?.token || null;
    },

    /**
     * Memeriksa apakah token masih valid
     * @returns {boolean}
     */
    isTokenValid() {
        const token = this.getToken();
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    },
};

export default authService;
