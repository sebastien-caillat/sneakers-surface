import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductEditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin: auto;
`

const ProductEditorForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: start;
`

export default function ProductEditor() {

    const [product, setProduct] = useState({ 
        attributes : { 
            title: "",
            price: "",
            description: "",
            inStock:"",
            creator:"",
            imageSmall: { data: { attributes: { url: "" } } },
            imageLarge: { data: { attributes: { url: "" } } }
        } 
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(id) {       
            axios.get(`http://localhost:1337/api/products/${id}?populate=*`)
                .then(response => {
                    setProduct({ attributes: response.data.data.attributes });
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === 'imageSmall' || e.target.name === 'imageLarge') {
          setProduct(prevProduct => ({
            ...prevProduct,
            attributes: {
              ...prevProduct.attributes,
              [e.target.name]: { data: { attributes: { url: e.target.value } } }
            }
          }));
        } else {
          setProduct(prevProduct => ({
            ...prevProduct,
            attributes: {
              ...prevProduct.attributes,
              [e.target.name]: e.target.value
            }
          }));
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        console.log("Form submitted", product.attributes);
        const config = {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
        }

        if(id) {

            // Update the existing product

            axios.put(`http://localhost:1337/api/products/${id}`, product.attributes, config)
                .then(() => {
                    navigate(`/product/${id}`);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {

            // Create a new product

            axios.post(`http://localhost:1337/api/products`, product.attributes, config)
                .then(() => {
                    navigate('/products');
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }


    return (
        <ProductEditorContainer>
            <h1>{id ? "Modifier le produit" : "Créer un produit"}</h1>
            <ProductEditorForm onSubmit={handleSubmit}>
            <div>
                <label>Nom du produit :</label>
                <input type="text" name="title" value={product.attributes.title} onChange={handleChange} />
            </div>
            <div>
                <label>Prix :</label>
                <input type="number" name="price" value={product.attributes.price} onChange={handleChange} />
            </div>
            <div>
                <label>Description :</label>
                <textarea name="description" value={product.attributes.description} onChange={handleChange} />
            </div>
            <div>
                <label>En stock :</label>
                <input type="checkbox" name="inStock" checked={product.attributes.inStock} onChange={handleChange} />
            </div>
            <div>
                <label>Créateur :</label>
                <input type="text" name="creator" value={product.attributes.creator} readOnly />
            </div>
            <div>
                <label>Image (petite) :</label>
                <input type="text" name="imageSmall" value={product.attributes.imageSmall.data.attributes.url} onChange={handleChange} />
            </div>
            <div>
                <label>Image (grande) :</label>
                <input type="text" name="imageLarge" value={product.attributes.imageLarge.data.attributes.url} onChange={handleChange} />
            </div>
            <button type="submit">{id ? "Modifier" : "Créer"}</button>
            </ProductEditorForm>
        </ProductEditorContainer>
    )
}