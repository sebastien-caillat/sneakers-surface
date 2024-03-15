import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import colors from "../../utils/colors";

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  background-color: ${colors.backgroundalt};
  border-radius: 15px;
`

const ProductCardImg = styled.img`
    width: 1000px;
    height: 500px;
    object-fit: cover;
`
const Yes = styled.span`
  color: green;
`;

const No = styled.span`
  color: red;
`;

export default function ProductInfos() {
    const [product, setProduct] = useState(null);
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
        <div>
            <ProductCard>
                <h1>{product.attributes.title}</h1>
                <ProductCardImg src={`http://localhost:1337${product.attributes.imageLarge.data.attributes.url}`} alt={product.attributes.title} />
                <p>{product.attributes.description}</p>
                <p>Prix: {product.attributes.price} €</p>
                <p>En stock: {product.attributes.inStock ? <Yes>Oui</Yes> : <No>Non</No>}</p>
                <p>Vendeur: {product.attributes.creator}</p>
            </ProductCard>
        </div>
    );
}

