import { useState, useCallback } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  duration?: number;
}

interface UseAlertReturn {
  alerts: Alert[];
  showAlert: (type: AlertType, message: string, duration?: number) => void;
  hideAlert: (id: string) => void;
  clearAlerts: () => void;
}

export const useAlert = (): UseAlertReturn => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = useCallback(
    (type: AlertType, message: string, duration: number = 3000) => {
      const id = `alert-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newAlert: Alert = { id, type, message, duration };

      setAlerts((prev) => [...prev, newAlert]);

      // Auto-dismiss after duration
      if (duration > 0) {
        setTimeout(() => {
          hideAlert(id);
        }, duration);
      }
    },
    []
  );

  const hideAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return {
    alerts,
    showAlert,
    hideAlert,
    clearAlerts,
  };
};

export default useAlert;
