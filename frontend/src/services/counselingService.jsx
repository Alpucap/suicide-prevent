import api from "./api";

const counselingService = {
    /**
     * Mendapatkan semua sesi konseling
     * @returns {Promise<Object>} - { success, data, message, error }
     */
    async getAllCounselings() {
        try {
            const response = await api.get("/counselings");
            return {
                success: true,
                data: response.data,
                message: "Berhasil mendapatkan semua sesi konseling",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal mendapatkan sesi konseling",
                error: error.response?.data,
            };
        }
    },

    /**
     * Mendapatkan sesi konseling berdasarkan ID
     * @param {number} counselingId - ID sesi konseling
     * @returns {Promise<Object>} - { success, data, message, error }
     */
    async getCounselingById(counselingId) {
        try {
            const response = await api.get(`/counselings/${counselingId}`);
            return {
                success: true,
                data: response.data,
                message: "Berhasil mendapatkan sesi konseling",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal mendapatkan sesi konseling",
                error: error.response?.data,
            };
        }
    },

    /**
     * Membuat sesi konseling baru
     * @param {Object} counselingData - Data sesi konseling { title, description, userId }
     * @returns {Promise<Object>} - { success, message, error }
     */
    async createCounseling(counselingData) {
        try {
            const response = await api.post("/counselings", counselingData);
            return {
                success: true,
                data: response.data.counseling,
                message: response.data.message || "Sesi konseling berhasil dibuat",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal membuat sesi konseling",
                error: error.response?.data,
            };
        }
    },

    /**
     * Memperbarui sesi konseling berdasarkan ID
     * @param {number} counselingId - ID sesi konseling
     * @param {Object} counselingData - Data sesi konseling yang baru { title, description }
     * @returns {Promise<Object>} - { success, message, error }
     */
    async updateCounseling(counselingId, counselingData) {
        try {
            const response = await api.put(`/counselings/${counselingId}`, counselingData);
            return {
                success: true,
                data: response.data.counseling,
                message: response.data.message || "Sesi konseling berhasil diperbarui",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal memperbarui sesi konseling",
                error: error.response?.data,
            };
        }
    },

    /**
     * Menghapus sesi konseling berdasarkan ID
     * @param {number} counselingId - ID sesi konseling
     * @returns {Promise<Object>} - { success, message, error }
     */
    async deleteCounseling(counselingId) {
        try {
            const response = await api.delete(`/counselings/${counselingId}`);
            return {
                success: true,
                message: response.data.message || "Sesi konseling berhasil dihapus",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal menghapus sesi konseling",
                error: error.response?.data,
            };
        }
    },
};

export default counselingService;
