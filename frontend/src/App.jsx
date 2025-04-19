import React from "react";
import { BrowserRouter as Router, Route, Routes, useRouteError } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage"; 
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorPage from "./pages/errors/ErrorPage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import ServerErrorPage from "./pages/errors/ServerErrorPage";
import ForgotPasswordPage from './pages/ForgotPasswordPage';

class ErrorBoundary extends React.Component {
    state = { hasError: false };

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

function RouteErrorHandler() {
    const error = useRouteError();
    console.error("Route Error:", error);

    if (error.status === 500) {
        return <ServerErrorPage />;
    }
    
    if (error.status === 404) {
        return <NotFoundPage />;
    }

    return <ErrorPage error={error} />;
}

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                {window.location.pathname !== "/login" && window.location.pathname !== "/register"  && <Navbar />}
                
                <main className="flex-grow">
                    <Routes>
                        <Route path="/login" element={
                            <ErrorBoundary fallback={<RouteErrorHandler />}>
                                <LoginPage />
                            </ErrorBoundary>
                        } errorElement={<RouteErrorHandler />} />

                        <Route path="/register" element={
                            <ErrorBoundary fallback={<RouteErrorHandler />}>
                                <RegisterPage />
                            </ErrorBoundary>
                        } errorElement={<RouteErrorHandler />} />

                        <Route 
                            path="/" 
                            element={
                                <ErrorBoundary fallback={<RouteErrorHandler />}>
                                    <HomePage />
                                </ErrorBoundary>
                            } 
                            errorElement={<RouteErrorHandler />} 
                        />
                        <Route 
                            path="/profile" 
                            element={
                                <ErrorBoundary fallback={<RouteErrorHandler />}>
                                    <ProfilePage />
                                </ErrorBoundary>
                            } 
                            errorElement={<RouteErrorHandler />} 
                        />
                        <Route path="/500" element={<ServerErrorPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="/forgot-password" element={
                            <ErrorBoundary fallback={<RouteErrorHandler />}>
                                <ForgotPasswordPage />
                            </ErrorBoundary>
                        } errorElement={<RouteErrorHandler />} />
                    </Routes>
                </main>
                
                {window.location.pathname !== "/login" && window.location.pathname !== "/register" && <Footer /> }
            </div>
        </Router>
    );
}

export default App;
