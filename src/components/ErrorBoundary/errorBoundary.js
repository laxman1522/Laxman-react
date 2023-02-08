import React from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import PropTypes from "prop-types";


/**
 * @description for showing Fall back UI if any error occured
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <div className={this.props.className}>{APPCONSTANTS.LOTTERY_ERROR_MESSAGE}</div>;
      }
      return this.props.children; 
    }
}

//INFO: prop types
ErrorBoundary.propTypes = {
  className: PropTypes.string,
}

//INFO: default props
ErrorBoundary.defaultProps = {
  className: APPCONSTANTS.NIL
}


export default ErrorBoundary;