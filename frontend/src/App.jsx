import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

// Import pages
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ShareYourThought from "./pages/ShareYourThoughtPage";

// Import components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/LoadingSpinner";

// Import error pages
import ErrorPage from "./pages/errors/ErrorPage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import ServerErrorPage from "./pages/errors/ServerErrorPage";

// Error boundary component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error Boundary caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <ErrorPage />;
        }
        return this.props.children;
    }
}

function AppLayout() {
    const location = useLocation();
    const hideNavbarFooter = ["/login", "/register"].includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen">
            {!hideNavbarFooter && <Navbar />}

            <main className="flex-grow">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <ErrorBoundary fallback={<ErrorPage />}>
                                <LoginPage />
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <ErrorBoundary fallback={<ErrorPage />}>
                                <RegisterPage />
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <ErrorBoundary fallback={<ErrorPage />}>
                                <HomePage />
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ErrorBoundary fallback={<ErrorPage />}>
                                <ProfilePage />
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="/share-your-thought"
                        element={
                            <ErrorBoundary fallback={<ErrorPage />}>
                                <ShareYourThought />
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <ErrorBoundary fallback={<ErrorPage />}>
                                <ForgotPasswordPage />
                            </ErrorBoundary>
                        }
                    />
                    <Route path="/500" element={<ServerErrorPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            {!hideNavbarFooter && <Footer />}
        </div>
    );
}

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Router>
            {loading ? <Loading /> : <AppLayout />}
        </Router>
    );
}

export default App;
