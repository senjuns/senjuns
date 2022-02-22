import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useState, ReactElement } from 'react';

interface AlertInterface {
  /**
   * Function that renders the alert message.
   */
  render: () => ReactElement;
  /**
   * Function that opens the alert message.
   */
  open: () => void;
  /**
   * Function that closes the alert message.
   */
  close: () => void;
}

/**
 * Custom hook wrapper to help alerting text in easier way.
 * @param {string} text - text to be displayed as an alert.
 * @returns {AlertInterface} handlers to control the alert behavior.
 */
export const useAlert = (text: string): AlertInterface => {
  const [showAlert, setShowAlert] = useState(false);

  const handleOpenAlert = () => setShowAlert(true);

  const handleCloseAlert = () => setShowAlert(false);

  const render = () => {
    return (
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          {text}
        </Alert>
      </Snackbar>
    );
  };

  return { render, open: handleOpenAlert, close: handleCloseAlert };
};
