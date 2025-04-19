import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-text mb-6">Halaman Tidak Ditemukan</h2>
        <p className="text-text mb-8">
          Maaf, halaman yang Anda cari tidak ada.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition duration-300"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
