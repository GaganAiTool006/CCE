import React from 'react';
import { useApp } from '../context/AppContext';

const Toast = () => {
  const { toasts } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className="toast">
          <i className={`${toast.iconClass} toast-icon`}></i>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Toast;
