import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes/AppRoutes.routes.jsx';
import { AuthProvider } from './store/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<AuthProvider>
		<React.StrictMode>
			<AppRoutes />
		</React.StrictMode>
	</AuthProvider>
);
