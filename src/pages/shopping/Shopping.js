import "./Shopping.scss";
import React from "react";
import MenuBar from "../../components/menuBar/MenuBar";
import ShoppingCardContainer from "../../components/shoppingCardContainer/ShoppingCardContainer";
import { ProductsService } from "../../services/ProductsServices";
import Cart from "../../components/cart/Cart";

/**
 * shopping page which allows user to select the item based on the category
 */
class ShoppingPage extends React.Component{

    addedItems=[];

     //state initialization
   state={items:[],category:"men",addedItems:[],cartCount:(JSON.parse(localStorage.getItem("items"))?.length || 0),disableButton:true,loading:true};

   componentDidMount(){
        const category=window.location.pathname.split("/")
        const items=JSON.parse(localStorage.getItem("items")) || [];
        localStorage.getItem("items")?this.setState({disableButton:false,addedItems:items}):this.setState({disableButton:true,addedItems:items});
        this.categorySelected(category[1]);
   }

   /**
    * 
    * updating the added items
    */
   itemAdded=(event)=>{
        const addedItems= this.state.addedItems || [];
        addedItems.push(event);
        this.setState({addedItems:addedItems,disableButton:false,cartCount:this.state.addedItems.length});
        localStorage.setItem("items",JSON.stringify(this.state.addedItems));
   }

   /**
    * 
    * updating the item details based on the selected category
    */
    categorySelected=async (event)=>{
        const selectedItems=await ProductsService.getItems(event);    
        selectedItems && this.setState({items:selectedItems,category:event,loading:false});
        this.setState({cartCount:this.state.addedItems.length});
    }

    render(){
        return(
            //Shopping Page content
            <div className="shopping-page-container">
                <MenuBar categorySelected={this.categorySelected}/>
                <ShoppingCardContainer items={this.state.items} category={this.state.category} loading={this.state.loading} itemAdded={this.itemAdded} />
                <Cart addedItems={this.state.addedItems} cartCount={this.state.cartCount} disableButton={this.state.disableButton} orderPlaced={()=>{}}/>
            </div>
        )
    }
}


export default ShoppingPage;