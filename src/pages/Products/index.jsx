import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import colors from "../../utils/colors";

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 500px;
  background-color: ${colors.backgroundalt};
  border-radius: 15px;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`

const ProductCardImg = styled.img`
  max-width: 350px;
  max-height: 300px;
  border-top-left-radius: 15px;
  object-fit: cover;
`

const ProductCardInfos = styled.div`
  padding-left: 15px;
`

const Yes = styled.span`
  color: green;
`;

const No = styled.span`
  color: red;
`;

export default function Products() {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    }
  
    // Fetch products from the Strapi API

    useEffect(() => {
      axios.get('http://localhost:1337/api/products?populate=*')
        .then(response => {
          setProducts(response.data.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }, []);

    console.log(products);
  
  return(

    <ProductContainer>
      <h1>Products</h1>
      <h2>Populaires</h2>
      {products.map(product => (
        <ProductCard key={product.id} onClick={() => handleClick(`/product/${product.id}`)}>
          <ProductCardImg src={`http://localhost:1337${product.attributes.imageSmall.data.attributes.url}`} alt={product.attributes.title} />
          <ProductCardInfos>
            <h3>{product.attributes.title}</h3>
            <p>{product.attributes.description}</p>
            <p>Prix: {product.attributes.price}</p>
            <p>En stock: {product.attributes.inStock ? <Yes>Oui</Yes> : <No>Non</No>}</p>
            <p>Vendeur: {product.attributes.creator}</p>
          </ProductCardInfos>
        </ProductCard>
      ))}
    </ProductContainer>

  );

}