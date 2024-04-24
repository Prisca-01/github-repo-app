import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-900 text-black">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
          <p className="text-lg mb-2">{this.state.error && this.state.error.toString()}</p>
          <p className="text-lg">{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
        </div>
      </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
