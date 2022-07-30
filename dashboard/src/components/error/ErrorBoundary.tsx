import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * @returns {JSX.Element} - The rendered error boundary.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * Update state so the next render will show the fallback UI.
   *
   * @param {Error} error - The error happened
   * @returns {ErrorBoundaryState} - The state with error.
   */
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  state: ErrorBoundaryState = { error: null };

  /**
   * We can log the error to an error reporting service
   * @param {Error} error - The error
   * @param {ErrorInfo} errorInfo - The error information
   * @returns {void}
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('error', error, 'errorInfo', errorInfo);
  }

  /**
   * @returns {JSX.Element} - The rendered component.
   */
  render() {
    const { error } = this.state;
    if (error) {
      // You can render any custom fallback UI
      return (
        <BoundaryContainer>
          <Alert>
            <AlertTitle>Oops, something went wrong!</AlertTitle>
            <div>{error?.message}</div>
            <br />
            <br />
            If the error continues, please email support@senjuns.com
          </Alert>
        </BoundaryContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const BoundaryContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
