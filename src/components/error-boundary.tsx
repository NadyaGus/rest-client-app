'use client';

import React, { Component, ReactNode } from 'react';

import { ErrorDisplay } from './error-display';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <ErrorDisplay message={this.state.error?.message} onRetry={() => this.setState({ hasError: false })} />
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
