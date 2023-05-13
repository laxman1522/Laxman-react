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

    logic  = () => {
        if((this.state.timer >= 0) && this.state.initialTime!==undefined) {
            this.timeout = setTimeout(() => {
                this.setState ({
                    timer: this.state.initialTime-this.state.count,
                    count: this.state.count+1
                })
            },[1000])
        }
        else {
                clearTimeout(this.timeout);
                if(this.state.showAdImage) {
                    this.setState({
                        showAdImage: false,
                        showAd: false,
                        timer: undefined 
                })
            }
        }  
    }

    componentDidUpdate() {
        clearTimeout(this.timeout)
        this.logic();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

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
          showAd={this.state.showAd} startedPlaying={this.startedPlaying} showingAd={this.showingAd} teaserTime={this.teaserTime}></OriginalComponent>
        );
      }
    }

    return NewComponent;
}

export default HOC;