const { Counseling } = require("../models");

// ✅ Ambil semua sesi konseling
exports.getAllCounselings = async (req, res) => {
  try {
    const counselings = await Counseling.findAll();
    res.json(counselings);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data." });
  }
};

// ✅ Ambil satu sesi konseling berdasarkan ID
exports.getCounselingById = async (req, res) => {
  try {
    const counseling = await Counseling.findByPk(req.params.id);
    if (!counseling) return res.status(404).json({ message: "Sesi konseling tidak ditemukan" });

    res.json(counseling);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data." });
  }
};

// ✅ Buat sesi konseling baru
exports.createCounseling = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    if (!title || !description || !userId) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    const counseling = await Counseling.create({ title, description, userId });
    res.status(201).json({ message: "Sesi konseling dibuat", counseling });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat membuat sesi konseling." });
  }
};

// ✅ Perbarui sesi konseling berdasarkan ID
exports.updateCounseling = async (req, res) => {
  try {
    const { title, description } = req.body;
    const counseling = await Counseling.findByPk(req.params.id);

    if (!counseling) {
      return res.status(404).json({ message: "Sesi konseling tidak ditemukan" });
    }

    await counseling.update({ title, description });
    res.json({ message: "Sesi konseling diperbarui", counseling });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat memperbarui sesi konseling." });
  }
};

// ✅ Hapus sesi konseling berdasarkan ID
exports.deleteCounseling = async (req, res) => {
  try {
    const counseling = await Counseling.findByPk(req.params.id);
    if (!counseling) {
      return res.status(404).json({ message: "Sesi konseling tidak ditemukan" });
    }

    await counseling.destroy();
    res.json({ message: "Sesi konseling berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus sesi konseling." });
  }
};
