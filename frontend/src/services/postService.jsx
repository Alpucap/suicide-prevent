import api from "./api";

const postService = {
    /**
     * Mendapatkan semua post
     * @returns {Promise<Object>} - { success, data, message, error }
     */
    async getAllPosts() {
        try {
            const response = await api.get("/posts");
            return {
                success: true,
                data: response.data,
                message: "Berhasil mendapatkan semua post",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal mendapatkan semua post",
                error: error.response?.data,
            };
        }
    },

    /**
     * Mendapatkan post berdasarkan ID
     * @param {number} postId - ID post
     * @returns {Promise<Object>} - { success, data, message, error }
     */
    async getPostById(postId) {
        try {
            const response = await api.get(`/posts/${postId}`);
            return {
                success: true,
                data: response.data,
                message: "Berhasil mendapatkan data post",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal mendapatkan data post",
                error: error.response?.data,
            };
        }
    },

    /**
     * Membuat post baru
     * @param {Object} postData - Data post { content, userId }
     * @returns {Promise<Object>} - { success, message, error }
     */
    async createPost(postData) {
        try {
            const response = await api.post("/posts", postData);
            return {
                success: true,
                data: response.data.post,
                message: response.data.message || "Post berhasil dibuat",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal membuat post",
                error: error.response?.data,
            };
        }
    },

    /**
     * Memperbarui post berdasarkan ID
     * @param {number} postId - ID post
     * @param {Object} postData - Data post yang baru { content }
     * @returns {Promise<Object>} - { success, message, error }
     */
    async updatePost(postId, postData) {
        try {
            const response = await api.put(`/posts/${postId}`, postData);
            return {
                success: true,
                data: response.data.post,
                message: response.data.message || "Post berhasil diperbarui",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal memperbarui post",
                error: error.response?.data,
            };
        }
    },

    /**
     * Menghapus post berdasarkan ID
     * @param {number} postId - ID post
     * @returns {Promise<Object>} - { success, message, error }
     */
    async deletePost(postId) {
        try {
            const response = await api.delete(`/posts/${postId}`);
            return {
                success: true,
                message: response.data.message || "Post berhasil dihapus",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Gagal menghapus post",
                error: error.response?.data,
            };
        }
    },
};

export default postService;
