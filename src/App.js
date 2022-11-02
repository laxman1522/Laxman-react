
import './App.css';
import React from "react"
import SeasonDisplay from './seasonDisplay/SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

  state={lat:null,err:""};

  componentDidMount(){
    window.navigator.geolocation.getCurrentPosition(
      position=>{
        this.setState({lat:position.coords.latitude});
      },
      error=>{
        this.setState({err:error});
      }
    );
  }
  render() {
    if(this.state.err && !this.state.lat)
    {
      return <div>Error:{this.state.err}</div>
    }
    if(!this.state.err && this.state.lat)
    {
      return <SeasonDisplay lat={this.state.lat}/>
    }

    return <Spinner/>
  }
}

export default App;
