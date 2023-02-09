import React from "react";
import './App.css';
import axios from "axios";
import unsplash from "./api/unsplash";
import SearchBar from './searchBar/SearchBar';
import ImageList from "./imageList/ImageList";

class App extends React.Component {

  state={images:[]};

   onSearchSubmit=async (text)=>{
    const response= await unsplash.get("search/photos",{
      params:{query:text}
    });
    this.setState({images:response.data.results});
  }

  render(){
    return (
      <div className='ui container' style={{marginTop:"10px"}}>
        
      </div>
    );
  }
  
}

export default App;
