import { useNavigate } from 'react-router-dom';
import { Component } from 'react';

export default class ErrorBoundary extends Component {
    state = { hasError: false };
    
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error("Error:", error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
        return this.props.fallback || (
            <div className="p-4 bg-red-50 text-red-600">
            Terjadi kesalahan! Silakan refresh halaman.
            </div>
        );
        }
        return this.props.children;
    }
}