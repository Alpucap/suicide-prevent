import { useNavigate } from 'react-router-dom';

export default function ServerErrorPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-5xl font-bold text-red-600 mb-4">500</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Server Error</h2>
                <p className="text-gray-600 mb-8">
                Maaf, terjadi kesalahan pada server kami. Silakan coba lagi nanti.
                </p>
                <div className="flex justify-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                    Kembali
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Ke Beranda
                </button>
                </div>
            </div>
        </div>
    );
}