import './bookingContainer.scss';
import { AppConstants } from '../../constants/appConstants';
import primeLogo from '../../assets/prime.png';
import React, { useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { memo } from 'react';
import DiscountDisplayer from '../../components/DiscountDisplayer/discountDisplayer';
import Button from '../../components/Button/button';
import ButtonGroup from '../../components/ButtonGroup/buttongroup';
import PropTypes from "prop-types";
import { PrimeContext } from '../../App';

const MembershipDiscount = {
    type:AppConstants.MEMBERSHIP_DISCOUNT,
    amount:10
  }

const TaxAmount = {
    type:AppConstants.TAX_AMOUNT,
    amount:5
}

const ButtonGroupYear = {
    value:[1,2,3],
    type:AppConstants.YEAR
}

const ButtonGroupTax = {
    value:[10,20,30],
    type:"%"
}

/**
 *  Display the fare for the selected flight and allows the user to select membership & tax
 */
const BookingContainer = (props) => {

    console.log("Container - Booking Container");

    const {flightDetails} = props;

    const isUserPrime = useContext(PrimeContext);
    const [fare,setFare] = useState();
    const baseFareRef = useRef(flightDetails.fare);
    const membershipDiscountRef = useRef(MembershipDiscount);
    const taxAmountref = useRef(TaxAmount);

    useEffect(() => {
        baseFareRef.current = flightDetails.fare;
        membershipDiscountRef.current = MembershipDiscount;
        taxAmountref.current = TaxAmount;
        setFare(flightDetails.fare - MembershipDiscount.amount + TaxAmount.amount);
    },[flightDetails])

    //updating the fare, membership discount & tax amount based on the user selection
    const buttonClickHandler = useCallback((buttonValue) => {
        const value = buttonValue.split(" ");
        const updatedFare = value[1] === AppConstants.YEAR ? (MembershipDiscount.amount + (value[0]*5)) : (TaxAmount.amount + TaxAmount.amount*(value[0]*0.01));
        if(value[1] === AppConstants.YEAR) {
            const updatedMembershipDiscount = {
                type:MembershipDiscount.type,
                amount:updatedFare
            }
            if(membershipDiscountRef.current.amount !== updatedMembershipDiscount.amount) {
                (membershipDiscountRef.current = updatedMembershipDiscount);
                setFare(parseInt(baseFareRef.current) - updatedFare + taxAmountref.current.amount);
            }
        }
        else {
            const updatedTaxAmount = {
                type:TaxAmount.type,
                amount:updatedFare
            }
            if(taxAmountref.current.amount !== updatedTaxAmount.amount) {
                taxAmountref.current = updatedTaxAmount;
                setFare(parseInt(baseFareRef.current) + updatedFare - membershipDiscountRef.current.amount);
            }
        }
    },[]);

    return(
        <div className='booking-container'>
            <div className='heading-logo d-flex justify-space-between'>
                <div className='book-now fw-bold'>{AppConstants.BOOK_NOW}</div>
                {isUserPrime && <img src={primeLogo} alt="prime-logo"></img>}
            </div>
            <div className='fare'>$ {fare}</div>
            <div className='discount-container d-flex'>
                <DiscountDisplayer discountDetails={membershipDiscountRef.current}></DiscountDisplayer>
                <DiscountDisplayer discountDetails={taxAmountref.current}></DiscountDisplayer>
            </div>
            <div className='membership-renewal'>{AppConstants.MEMBERSHIP_RENEWAL}</div>
            <ButtonGroup buttonValue={ButtonGroupYear} buttonClickHandler={buttonClickHandler}></ButtonGroup>
            <div className='covid-donation'>{AppConstants.COVID_DONATION}</div>
            <ButtonGroup buttonValue={ButtonGroupTax} buttonClickHandler={buttonClickHandler}></ButtonGroup>
            <div className='ticket-sending-details'>{AppConstants.TICKET_SENDING_DETAILS}</div>
            <Button buttonName={AppConstants.PROCEED_TO_PAY}></Button>
        </div>
    )
}

BookingContainer.propTypes = {
    fare: PropTypes.number
}

BookingContainer.defaultProps = {
    fare: 0
}

export default memo(BookingContainer);