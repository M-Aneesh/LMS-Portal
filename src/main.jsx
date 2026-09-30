import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './state-management/contextApi.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
    <Toaster position='top-right' />
       <App />
    </AuthProvider>
)