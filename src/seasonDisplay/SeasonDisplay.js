import React from "react";
import "./SeasonDisplay.css";

const seasonConfig={
  summer:{
    text:"Lets hit the beach",
    icon:"sun"
  },
  winter:{
    text:"Burr, It is chilly",
    icon:"snowflake"
  }
}

const getSeason=(lat,month)=>{
    if(month>2 && month<9)
    {
        return lat > 0 ? "summer" : "winter";
    }
    else{
        return lat > 0 ? "winter" : "summer";
    }
}

const SeasonDisplay=(props)=>{

    const month=new Date().getMonth();
    const season=getSeason(props.lat,month);
    const {text,icon}=seasonConfig[season];
    console.log(season);
    return(
        <div className={`seasonDisplay ${season}`}>
            <i className={`${icon} icon icon-left massive`}></i>
            <div>{text}</div>
            <i className={`${icon} icon icon-right massive`}></i>
        </div>
    );
}

export default SeasonDisplay;