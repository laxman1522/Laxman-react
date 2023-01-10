import './bookingContainer.scss';
import { AppConstants } from '../../constants/appConstants';
import primeLogo from '../../assets/prime.png';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { memo } from 'react';
import { MembershipDiscountContext, TaxAmountContext, PrimeContext } from '../../components/ContainerHolder/containerHolder';
import DiscountDisplayer from '../../components/DiscountDisplayer/discountDisplayer';
import Button from '../../components/Button/button';
import ButtonGroup from '../../components/ButtonGroup/buttongroup';
import PropTypes from "prop-types";

/**
 *  Display the fare for the selected flight and allows the user to select membership & tax
 */
const BookingContainer = (props) => {

    console.log("Container - Booking Container");

    const MembershipDiscount = {
        type:AppConstants.MEMBERSHIP_DISCOUNT,
        amount:10
      }
    
      const TaxAmount = {
        type:AppConstants.TAX_AMOUNT,
        amount:5
    }

    const {flightDetails} = props;

    useEffect(() => {
        setFare(flightDetails.fare - MembershipDiscount.amount + TaxAmount.amount);
        setMembershipDiscount(MembershipDiscount);
        setTaxAmount(TaxAmount);
    },[flightDetails])

    const [fare,setFare] = useState(flightDetails.fare);
    const [membershipDiscount, setMembershipDiscount] = useState(MembershipDiscount);
    const [taxAmount, setTaxAmount] = useState(TaxAmount);

    const ButtonGroupYear = {
        value:[1,2,3],
        type:AppConstants.YEAR
    }

    const ButtonGroupTax = {
        value:[10,20,30],
        type:"%"
    }

    const isUserPrime = useContext(PrimeContext);

    //updating the fare, membership discount & tax amount based on the user selection
    const buttonClickHandler = (buttonValue) => {
        const value = buttonValue.split(" ");
        const updatedFare = value[1] === AppConstants.YEAR ? (MembershipDiscount.amount + (value[0]*5)) : (TaxAmount.amount + TaxAmount.amount*(value[0]*0.01));
        if(value[1] === AppConstants.YEAR) {
          let updatedMembershipDiscount = MembershipDiscount;
          updatedMembershipDiscount.amount = updatedFare;
          setMembershipDiscount(updatedMembershipDiscount);
          setFare(parseInt(flightDetails.fare) - updatedFare + taxAmount.amount);
        }
        else {
          let updatedTaxAmount = TaxAmount;
          updatedTaxAmount.amount = updatedFare; 
          setTaxAmount(updatedTaxAmount);
          setFare(parseInt(flightDetails.fare) + updatedFare - membershipDiscount.amount);
        }
    }

    return(
        <div className='booking-container'>
            <div className='heading-logo d-flex justify-space-between'>
                <div className='book-now fw-bold'>{AppConstants.BOOK_NOW}</div>
                {isUserPrime && <img src={primeLogo} alt="prime-logo"></img>}
            </div>
            <div className='fare'>$ {fare}</div>
            <div className='discount-container d-flex'>
                <DiscountDisplayer discountDetails={membershipDiscount}></DiscountDisplayer>
                <DiscountDisplayer discountDetails={taxAmount}></DiscountDisplayer>
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