import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import colors from "../../utils/colors";

const ProductCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 3%;
    @media(max-width: 768px) {
        margin: 10% 0;
    }
`

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  height: 800px;
  margin: auto;
  padding-bottom: 30px;
  background-color: ${colors.backgroundalt};
  border-radius: 15px;
  @media(max-width: 1024px) {
    text-align: center;
    width: 90%;
  }
  @media(max-width: 768px) {
    height: 600px;
  }
`

const ProductCardTitle = styled.h1`
    margin: 20px 10px 20px 10px;
`

const ProductCardImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 25px;
`
const Yes = styled.span`
  color: green;
`;

const No = styled.span`
  color: red;
`;

const QuantityInput = styled.input`
  width: 40px; 
  height: 15px; 
  margin: 10px 0px 10px 10px;
  padding: 5px; 
  border: 1px solid ${colors.primary}; 
  border-radius: 15px; 
`;

const SubmitButton = styled.button`
  display: flex;
  width: 225px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 50px;
`

export default function ProductInfos() {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:1337/api/products/${id}?populate=*`)
            .then(response => {
                setProduct(response.data.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }, [id]);
    
    if (!product) {
        return <div>Loading...</div>;
    }

    return(
        <ProductCardContainer>
            <ProductCard>
                <ProductCardTitle>{product.attributes.title}</ProductCardTitle>
                <ProductCardImg src={`http://localhost:1337${window.innerWidth <= 768 ? product.attributes.imageSmall.data.attributes.url : product.attributes.imageLarge.data.attributes.url}`} alt={product.attributes.title} />
                <p>{product.attributes.description}</p>
                <p>Prix: {product.attributes.price} €</p>
                <p>En stock: {product.attributes.inStock ? <Yes>Oui</Yes> : <No>Non</No>}</p>
                <p>Vendeur: {product.attributes.creator}</p>
                <label>
                    Quantity:
                    <QuantityInput
                        type="number"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </label>
            </ProductCard>
            <SubmitButton onClick={() => alert(`Vous avez ajouté ${quantity} ${product.attributes.title} au panier`)}>Ajouter au panier</SubmitButton>
        </ProductCardContainer>
    );
}

