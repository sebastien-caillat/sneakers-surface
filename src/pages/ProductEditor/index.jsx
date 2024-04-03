import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import colors from "../../utils/colors";

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

const PlaceholderImage = styled.div`
  width: 250px;
  height: 250px;
  background-color: ${colors.backgroundalt};
  margin: 10px 0;
`;

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

    // State variables for the images files of the product

    const [selectedImageSmall, setSelectedImageSmall] = useState(null);
    const [selectedImageLarge, setSelectedImageLarge] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch the product data if a product id is provided

    useEffect(() => {
        if(id) {       
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}?populate=*`)
                .then(response => {
                    setProduct({ attributes: response.data.data.attributes });
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }, [id]);

    // Event handlers for input changes 

    const handleChange = (e) => {

        // If the input is for image, update the image URL
        
        if (e.target.name === 'imageSmall' || e.target.name === 'imageLarge') {
          setProduct(prevProduct => ({
            ...prevProduct,
            attributes: {
              ...prevProduct.attributes,
              [e.target.name]: { data: { attributes: { url: e.target.value } } }
            }
          }));

        // If the input is for inStock, update the inStock value 

        } else if (e.target.name === 'inStock') {
          setProduct(prevProduct => ({
            ...prevProduct,
            attributes: {
              ...prevProduct.attributes,
              [e.target.name]: e.target.checked
            }
          }));

        // If the input is for other fields, update the value directly  

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

    // Event handler for image file changes

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            if (e.target.name === 'imageSmall') {
                setSelectedImageSmall(e.target.files[0]);
            } else if (e.target.name === 'imageLarge') {
                setSelectedImageLarge(e.target.files[0]);
            }
        }
    };

    // Event handler for form submission

    const handleSubmit = (e) => {

        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        const config = {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data'
            }
        }

        let formData = new FormData();

        // Append the necessary fields to formData

        formData.append('data', JSON.stringify({
            title: product.attributes.title,
            price: product.attributes.price,
            description: product.attributes.description,
            inStock: product.attributes.inStock,
            creator: product.attributes.creator
        }));

        // Append the images to formData

        formData.append('files.imageSmall', product.attributes.imageSmall);
        formData.append('files.imageLarge', product.attributes.imageLarge);

        console.log(formData);

        if (selectedImageSmall) {
            formData.append('files.imageSmall', selectedImageSmall);
        }
        if (selectedImageLarge) {
            formData.append('files.imageLarge', selectedImageLarge);
        }

        if(id) {

            // Update the existing product

            axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}`, formData, config)
                .then(() => {
                    navigate(`/product/${id}`);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {

            // Create a new product

            axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/products`, formData, config)
                .then(response => {
                    navigate(`/product/${response.data.id}`);
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
                <label>Prix (en €) :</label>
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
                {product.attributes.imageSmall.data.attributes.url ? 
                    <ProductImage src={selectedImageSmall ? URL.createObjectURL(selectedImageSmall) : `${process.env.REACT_APP_API_BASE_URL}${product.attributes.imageSmall.data.attributes.url}`} alt="Small" /> :
                    <PlaceholderImage />
                }
                <InputItem type="file" name="imageSmall" onChange={handleImageChange} />
            </ImageFormItem>

            <FormItem>
                <label>Image (grande) :</label>
            </FormItem>
            <ImageFormItem>
                {product.attributes.imageLarge.data.attributes.url ? 
                    <ProductImage src={selectedImageLarge ? URL.createObjectURL(selectedImageLarge) : `${process.env.REACT_APP_API_BASE_URL}${product.attributes.imageLarge.data.attributes.url}`} alt="Large" /> :
                    <PlaceholderImage />
                }
                <InputItem type="file" name="imageLarge" onChange={handleImageChange} />
            </ImageFormItem>

            <SubmitButton type="submit">{id ? "Modifier" : "Créer"}</SubmitButton>
            </ProductEditorForm>
        </ProductEditorContainer>
    )
}