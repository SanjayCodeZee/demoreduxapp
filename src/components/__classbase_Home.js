import React from "react";

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            products: []
        };
    }
  
    componentDidMount() 
    { 
        console.log("componentDidMount()"); 
        this.fetchProducts();
    } 
  
    async fetchProducts() {
        try {
            this.setState({...this.state, isFetching: true});
            fetch('https://fakestoreapi.com/products')
            .then((response) =>  response.json())
            .then(json=> this.setState({products:json, isFetching : false}));
        } catch (e) {
            console.log("error handling");
        }
    }
    
    render(){
        console.log(this.state.products);
        
        return(
            <>
                <div className="row">
                    <div className="head-title"> 
                        <h2>Home</h2>
                    </div>
                    <div className="products">
                        {this.state.products.map((product) => {
                        return <div className="col-md-3 product" key={product.id}>
                            <img src={product.image} />
                            <div className="product-details">
                                <div>{product.title}</div>
                                <div className="category">{product.category}</div>
                                <div className="price">{product.price}</div>
                            </div>
                        </div>
                        })}
                    </div>
                </div>
            </>
        )
    }
}

export default Home;