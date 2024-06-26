import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  @media(max-width: 1024px) {
    width: 120px;
    height: 120px;
  }
  @media(max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`

const ProductCategory = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media(max-width: 1024px) {
    width: 120px;
    margin-left: 10px;
  }
  @media(max-width: 768px) {
    width: 80px;
    margin-left: 5px;
  }
`

const QuantityInput = styled.input`
  width: 40px;
  @media(max-width: 768px) {
    width: 30px;
  }
`

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: red;
  @media(max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`

const TotalPrice = styled.div`
  text-align: right;
  margin: 40px 0;
  font-size: 24px;
  @media(max-width: 768px) {
    text-align: center;
  }
`

const ConfirmationButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 3%;
`

const ConfirmationButton = styled.button`
  width: 160px;
`

const EmptyCartText = styled.p`
  text-align: center;
`

export default function Cart() {

  const [productData, setProductData] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [cartKey, setCartKey] = useState(localStorage.getItem('cartKey'));
  const navigate = useNavigate();
  const cart = useMemo(() => JSON.parse(localStorage.getItem('products')) || [], [cartKey]);

  // Update the cart key when the cart is updated

  useEffect(() => {

    const handleStorageChange = () => {
      setCartKey(localStorage.getItem('cartKey'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };

  }, []);


  // Retrieve the products data from the Strapi API 

  useEffect(() => {
    Promise.all(
      cart.map((product) =>
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${product.id}?populate=*`)
      )
    ).then((responses) => {
      const data = responses.map((response) => response.data.data);
      setProductData(data);
    });
  }, [cart]);

  // Remove product from local storage and state when user clicks on delete button

  const handleDelete = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedCart));
    setProductData(productData.filter((product) => product.id !== id));
  };

  // Update quantity in local storage and state when user changes the input value

  const handleQuantityChange = (e, id) => {

    let quantity = Number(e.target.value);
    if (quantity < 1) quantity = 1;
    if (quantity > 10) quantity = 10;

    const updatedCart = cart.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: quantity };
      }
      return product;
    });
    localStorage.setItem('products', JSON.stringify(updatedCart));
    window.location.reload();
  };

  // Calculate the total price of the cart

  const totalPriceGlobal = productData.reduce((sum, product, index) => {
    return sum + product.attributes.price * cart[index].quantity;
  }, 0);

  const handlePurchase = () => {
    
    const authToken = localStorage.getItem('authToken');

    if(!authToken) {

      navigate('/signin');

    } else {

      // Generate a random order ID.

      const newOrderId = Math.floor(Math.random() * 1000000000000);
      setOrderId(newOrderId);
      console.log(orderId);

      // Clean the LocalStorage of the ordered command

      localStorage.removeItem('products');

      // Redirect to the confirmation page with the order ID as a state parameter

      navigate('/confirmation', { state: { orderId: newOrderId } });

    }
  };

  return (
    <div>
      <CartTitle>Mon panier</CartTitle>
      {cart.length === 0 ? (
        <EmptyCartText>Votre panier est vide</EmptyCartText>
      ) : (
        <ProductList>

          <Product>
              <ProductCategory></ProductCategory> {/* Empty div for image column */}
              <ProductCategory>Produit</ProductCategory>
              <ProductCategory>Quantité</ProductCategory>
              <ProductCategory>Prix unitaire</ProductCategory>
              <ProductCategory>Prix Total</ProductCategory>
              <ProductCategory>Supprimer</ProductCategory>
          </Product>

          {productData.map((product, index) => {
            const totalPrice = product.attributes.price * cart[index].quantity;

            return (
              <Product key={product.id}>
                <ProductImage src={`${process.env.REACT_APP_API_BASE_URL}${product.attributes.imageSmall.data.attributes.url}`} alt={cart[index].title} />
                <ProductCategory>{cart[index].title}</ProductCategory>
                <ProductCategory>
                  <QuantityInput 
                    type="number" 
                    min="1" 
                    max="10" 
                    value={cart[index].quantity} 
                    onChange={(e) => handleQuantityChange(e, product.id)} 
                  />
                </ProductCategory>
                <ProductCategory>{product.attributes.price} €</ProductCategory>
                <ProductCategory>{totalPrice} €</ProductCategory>
                <ProductCategory>
                  <DeleteButton onClick={() => handleDelete(product.id)}>
                    <FaTimes />
                  </DeleteButton>
                </ProductCategory>
              </Product>
            );
          })}
          <TotalPrice>Total: {totalPriceGlobal} €</TotalPrice>
          <ConfirmationButtonContainer>
            <ConfirmationButton onClick={handlePurchase}>Valider</ConfirmationButton>
          </ConfirmationButtonContainer>
        </ProductList>
      )}
    </div>
  );
}