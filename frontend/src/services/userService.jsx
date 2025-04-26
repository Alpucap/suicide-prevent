import api from "./api";

const userService = {
    /**
     * Mendapatkan semua pengguna
     * @returns {Promise<Object>} - { success, data, message, error }
     */
    async getAllUsers() {
        try {
            const response = await api.get("/users");
            return {
                success: true,
                data: response.data,
                message: "Berhasil mendapatkan daftar pengguna",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal mendapatkan daftar pengguna",
                error: error.response?.data,
            };
        }
    },

    /**
     * Mendapatkan pengguna berdasarkan ID
     * @param {number} userId - ID pengguna
     * @returns {Promise<Object>} - { success, data, message, error }
     */
    async getUserById(userId) {
        try {
            const response = await api.get(`/users/${userId}`);
            return {
                success: true,
                data: response.data,
                message: "Berhasil mendapatkan data pengguna",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal mendapatkan data pengguna",
                error: error.response?.data,
            };
        }
    },

    /**
     * Memperbarui data pengguna
     * @param {number} userId - ID pengguna
     * @param {Object} userData - Data pengguna yang baru { username, email }
     * @returns {Promise<Object>} - { success, message, error }
     */
    async updateUser(userId, userData) {
        try {
            const response = await api.put(`/users/${userId}`, userData);
            return {
                success: true,
                data: response.data.user,
                message: response.data.message || "Pengguna berhasil diperbarui",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal memperbarui pengguna",
                error: error.response?.data,
            };
        }
    },

    /**
     * Menghapus pengguna
     * @param {number} userId - ID pengguna
     * @returns {Promise<Object>} - { success, message, error }
     */
    async deleteUser(userId) {
        try {
            const response = await api.delete(`/users/${userId}`);
            return {
                success: true,
                message: response.data.message || "Pengguna berhasil dihapus",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal menghapus pengguna",
                error: error.response?.data,
            };
        }
    },
};

export default userService;
