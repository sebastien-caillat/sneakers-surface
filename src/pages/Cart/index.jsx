import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import styled from "styled-components";

import { FaTimes } from "react-icons/fa";

const CartTitle = styled.h1`
  text-align: center;
`

const ProductList = styled.div`
  border-top: 1px solid white;
  width: 90%;
  margin: auto;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid white;
  padding: 10px 0;
`

const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`

const ImageColumn = styled.div`
  width: 200px;
`

export default function Cart() {

  const [productData, setProductData] = useState([]);
  const cart = useMemo(() => JSON.parse(localStorage.getItem('products')) || [], []);

  useEffect(() => {
    Promise.all(
      cart.map((product) =>
        axios.get(`http://localhost:1337/api/products/${product.id}?populate=*`)
      )
    ).then((responses) => {
      const data = responses.map((response) => response.data.data);
      setProductData(data);
    });
  }, [cart]);

  const handleDelete = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedCart));
    setProductData(productData.filter((product) => product.id !== id));
  };

  return (
    <div>
      <CartTitle>Mon panier</CartTitle>
      {cart.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <ProductList>
          <Product>
            <ImageColumn></ImageColumn> {/* Empty div for image column */}
            <div>Produit</div>
            <div>Quantité</div>
            <div>Prix unitaire</div>
            <div>Prix Total</div>
            <div>Supprimer</div>
          </Product>

          {productData.map((product, index) => {
            const totalPrice = product.attributes.price * cart[index].quantity;

            return (
              <Product key={product.id}>
                <ProductImage src={`http://localhost:1337${product.attributes.imageSmall.data.attributes.url}`} alt={cart[index].title} />
                <div>{cart[index].title}</div>
                <div>{cart[index].quantity}</div>
                <div>{product.attributes.price} €</div>
                <div>{totalPrice} €</div>
                <div>
                  <button onClick={() => handleDelete(product.id)}>
                    <FaTimes />
                  </button>
                </div>
              </Product>
            );
          })}
        </ProductList>
      )}
    </div>
  );
}