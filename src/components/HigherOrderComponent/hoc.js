/* eslint-disable no-useless-constructor */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

/**
 * 
 * @param {*} OriginalComponent 
 * @description Higher order component for performing same actions in teaser card and movie details component
 */
const HOC = (OriginalComponent ) => {

   class NewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: undefined,
            message: undefined,
            showAd:false,
            showAdImage: false,
            count:0,
            initialTime: undefined
        }
    };

    //INFO: For starting the timer once the video is started playing
    startedPlaying = (adDetails) => {
        if(!this.state.showAdImage) {
            this.setState ({
                timer: adDetails.timer,
                message: adDetails.message,
                showAd:true,
                showAdImage: false,
                count:1,
                initialTime: adDetails.timer
            })
        }   
    }

    teaserTime = (time, adDetails) => {
        this.setState({
            timer: adDetails.timer - time,
            message: adDetails.message,
            showAd: true
        })
    }

    stopAd = () => {
        this.setState({
            showAdImage: false,
            showAd: false
        })
    }

    //INFO: For showing the ad image once the timer reaches 0
    showingAd = (adDetails) => {
        this.setState({
            timer: adDetails.timer,
            message: adDetails.message,
            showAdImage: true,
            count:1,
            initialTime: adDetails.timer
        })
    } 

      render() {
        return (
          <OriginalComponent {...this.props} timer={this.state.timer} message={this.state.message} showAdImage={this.state.showAdImage} 
          showAd={this.state.showAd} startedPlaying={this.startedPlaying} showingAd={this.showingAd} stopAd={this.stopAd} teaserTime={this.teaserTime}></OriginalComponent>
        );
      }
    }

    return NewComponent;
}

export default HOC;