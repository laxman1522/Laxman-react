import React from "react";

class SearchBar extends React.Component{
    state={text:""};
    onFormSubmit=(event)=>{
        event.preventDefault();
        this.props.onSubmit(this.state.text);
    }
    render(){
        return(
            <div className="ui segment">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="ui field">
                        <label htmlFor="search">Image Search</label>
                        <input type="text" value={this.state.text} name="search" onChange={e=>this.setState({text:e.target.value})}></input>
                    </div>
                </form>
            </div>
            
        )
    }
}

export default SearchBar;