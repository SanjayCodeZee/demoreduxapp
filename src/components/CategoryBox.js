import React from 'react';

const CategoryBox = ({category}) =>{
    return (<>
        <div className="col-md-3">
            <div className="category-item">
                <img src="./images/icon-01.svg"/>
                <h5>{category.toUpperCase()}</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </div> 
    </>)
}

export default CategoryBox;