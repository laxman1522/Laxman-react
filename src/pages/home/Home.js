import React from "react";
import Footer from "../../component/footer/Footer";
import Header from "../../component/header/Header";
import ProductCategories from "../../component/productCategories/ProductCategories";

/**
 * 
 * @returns Home page - responsible for showing all the available product category and available menu options
 */
const Home = () => {
    
    return(
        <React.Fragment>
            <Header></Header>
            <ProductCategories/>
            <Footer/>
        </React.Fragment>
    )
}

export default Home;