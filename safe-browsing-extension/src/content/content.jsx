import React from 'react';
import ReactDOM from 'react-dom/client';
import WarningBanner from './WarningBanner';

// Create container div
const container = document.createElement('div');
document.body.appendChild(container);

// Mount the React component
const root = ReactDOM.createRoot(container);
root.render(<WarningBanner />);
