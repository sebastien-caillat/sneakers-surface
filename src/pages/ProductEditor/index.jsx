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
    align-items: center;
`

const FormItem = styled.div`
    margin-bottom: 15px;
`

const ImageFormItem = styled(FormItem)`
    display: flex;
    flex-direction: column;
`;

const InputItem = styled.input`
    border-radius: 8px;
    min-width: 240px;
    height: 26px;
`

const DescriptionArea = styled.textarea`
    border-radius: 8px;
    min-width: 240px;
    height: 100px;
`

const ProductImage = styled.img`
    width: 250px;
    height: 250px;
    object-fit: fill;
    margin: 10px 0;
`

const SubmitButton = styled.button`
    min-width: 150px;
    margin: 28px 0;
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

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
          setProduct(prevProduct => ({
            ...prevProduct,
            attributes: {
              ...prevProduct.attributes,
              [e.target.name]: { data: { attributes: { url: URL.createObjectURL(e.target.files[0]) } } }
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
            <FormItem>
                <label>Nom du produit :</label>
            </FormItem>
            <FormItem>
                <InputItem type="text" name="title" value={product.attributes.title} onChange={handleChange} />
            </FormItem>
            
            <FormItem>
                <label>Prix :</label>
            </FormItem>
            <FormItem>
                <InputItem type="number" name="price" value={product.attributes.price} onChange={handleChange} />
            </FormItem>

            <FormItem>
                <label>Description :</label>
            </FormItem>
            <FormItem>
                <DescriptionArea name="description" value={product.attributes.description} onChange={handleChange} />
            </FormItem>

            <FormItem>
                <label>En stock :</label>
                <input type="checkbox" name="inStock" checked={product.attributes.inStock} onChange={handleChange} />
            </FormItem>

            <FormItem>
                <label>Créateur :</label>
            </FormItem>
            <FormItem>
                <InputItem type="text" name="creator" value={product.attributes.creator} readOnly />
            </FormItem>

            <FormItem>
                <label>Image (petite) :</label>
            </FormItem>
            <ImageFormItem>
                <ProductImage src={`http://localhost:1337${product.attributes.imageSmall.data.attributes.url}`} alt="Small" />
                <InputItem type="file" name="imageSmall" onChange={handleImageChange} />
            </ImageFormItem>

            <FormItem>
                <label>Image (grande) :</label>
            </FormItem>
            <ImageFormItem>
                <ProductImage src={`http://localhost:1337${product.attributes.imageLarge.data.attributes.url}`} alt="Large" />
                <InputItem type="file" name="imageLarge" onChange={handleImageChange} />
            </ImageFormItem>

            <SubmitButton type="submit">{id ? "Modifier" : "Créer"}</SubmitButton>
            </ProductEditorForm>
        </ProductEditorContainer>
    )
}