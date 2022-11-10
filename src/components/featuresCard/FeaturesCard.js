import "./FeaturesCard.scss";
import PropTypes from "prop-types"


/**
 * features card component for showing all the available features
 */
const FeaturesCard=(props)=>{

    const {title,desc}=props.feature;

    return(
        <div className="features-card-container">
            <div className="blank"></div>
            <div className="title">{title}</div>
            <div className="content">{desc}</div>
        </div>
    )
}

FeaturesCard.propTypes={
    title:PropTypes.string,
    desc:PropTypes.string
}

FeaturesCard.defaultProps={
    title:"Not Found",
    desc:"No description"
}

export default FeaturesCard;