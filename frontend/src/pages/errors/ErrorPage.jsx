import { useRouteError, useNavigate } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    console.error(error);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-5xl font-bold text-red-600 mb-4">Error!</h1>
                <p className="text-lg text-gray-700 mb-2">Terjadi kesalahan</p>
                <p className="text-gray-500 mb-6">
                {error.statusText || error.message || "Unknown error occurred"}
                </p>
                <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                Kembali ke Beranda
                </button>
            </div>
        </div>
    );
}