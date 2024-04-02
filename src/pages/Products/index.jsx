import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import colors from "../../utils/colors";

import { API_BASE_URL } from "../../apiConfig";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ProductContainer = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
  @media(max-width: 768px) {
    flex-direction: column;
  }
`

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  min-height: 400px;
  background-color: ${colors.backgroundalt};
  border-radius: 15px;
  overflow: auto;
  margin: 50px;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  @media(max-width: 1024px) {
    width: 400px;
    min-height: 350px;
    margin: 25px;
  }
  @media(max-width: 768px) {
    width: 300px;
  }
`

const ProductCardImg = styled.img`
  max-width: 350px;
  max-height: 250px;
  border-top-left-radius: 15px;
  object-fit: fill;
`

const ProductCardInfos = styled.div`
  padding: 0 15px;
  line-height: 0.8;
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
      axios.get(`${API_BASE_URL}/api/products?populate=*`)
        .then(response => {
          setProducts(response.data.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }, []);

    console.log(products);
  
  return(
  
  <div>
    <TitleContainer>
    <h1>Produits en vente</h1>
      <button onClick={() => navigate('/product-editor')}>Ajouter un produit</button>
    <h2>Les nouveautés</h2>
    </TitleContainer>
    <ProductContainer>
      {products.map(product => (
        <ProductCard key={product.id} onClick={() => handleClick(`/product/${product.id}`)}>
          <ProductCardImg src={`${API_BASE_URL}${product.attributes.imageSmall.data.attributes.url}`} alt={product.attributes.title} />
          <ProductCardInfos>
            <h3>{product.attributes.title}</h3>
            <p>Prix: {product.attributes.price} €</p>
            <p>En stock: {product.attributes.inStock ? <Yes>Oui</Yes> : <No>Non</No>}</p>
            <p>Vendeur: {product.attributes.creator}</p>
          </ProductCardInfos>
        </ProductCard>
      ))}
    </ProductContainer>
  </div>
  );

}