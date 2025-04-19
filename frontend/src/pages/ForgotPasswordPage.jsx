import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmail('');
      setMessage('Instruksi reset password telah dikirim ke email Anda');
    } catch (err) {
      setMessage('Gagal mengirim permintaan reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-primary">
          <h1 className="text-2xl font-bold mb-6 text-center text-text">
            Lupa Password
          </h1>

          {message && (
            <div className={`mb-4 p-3 rounded text-sm ${
              message.includes('Gagal') ? 'bg-danger/10 text-danger' : 'bg-accent text-text'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-text">
                Email Anda
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded border border-secondary focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                placeholder="masukkan email terdaftar"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded font-medium transition-colors bg-primary hover:bg-primary-dark text-white disabled:opacity-70"
            >
              {isLoading ? 'Mengirim...' : 'Kirim Reset Link'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/login"
              className="text-sm hover:underline text-primary"
            >
              Kembali ke halaman login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}