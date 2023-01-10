import './discountDisplayer.scss';
import  PropTypes from "prop-types";
import { AppConstants } from '../../constants/appConstants';
import { memo } from 'react';

/**
 *  responsible for displaying different kind of discounts and tax details
 */
const DiscountDisplayer = (props) => {

    console.log("component - discount displayer")

    const {type,amount} = props.discountDetails;

    const {DOLLAR} = AppConstants;

    return(
        <div className='discount-container'>
            <div className='type'>{type}</div>
            <div className='amount fw-bold'>{DOLLAR} {amount}</div>
        </div>
    )
}

DiscountDisplayer.propTypes={
    type: PropTypes.string,
    amount: PropTypes.number
}

DiscountDisplayer.defaultProps={
    type: AppConstants.NIL,
    amount: 0
}

export default memo(DiscountDisplayer);