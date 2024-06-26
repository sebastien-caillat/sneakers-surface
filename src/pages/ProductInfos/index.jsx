import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import colors from "../../utils/colors";

const ProductCardContainer = styled.div`
    display: flex;
    width: 90%;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media(max-width: 768px) {
        margin-top: 7%;
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

const ProductModificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 -20px 0;
`

const ActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 150px;
  margin-bottom: 20px;
`

const SubmitButton = styled.button`
  display: flex;
  width: 225px;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`

export default function ProductInfos() {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [user, setUser] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();

    // Fetch the product from the API

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}?populate=*`)
            .then(response => {
                setProduct(response.data.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }, [id]);

    // Fetch the authentified user data from the API

    useEffect(() => {
        const fetchUser = async () => {
            const authToken = localStorage.getItem('authToken');
        
            try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/me`, {
                headers: {
                Authorization: `Bearer ${authToken}`,
                },
            });
        
            const user = response.data;
            setUser(user);

            // console.log(user);

            } catch (error) {
            console.error('There was an error!', error);
            }
        };
        
        fetchUser();
        }, []);

    // Delete the product on the API

    const handleDelete = () => {
        if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {

            const authToken = localStorage.getItem('authToken');
            const config = {
                headers: {
                'Authorization': `Bearer ${authToken}`,
                }
            }

            axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}`, config)
            .then(() => {

                let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
                storedProducts = storedProducts.filter(storedProduct => storedProduct.id !== id);
                localStorage.setItem('products', JSON.stringify(storedProducts));

                // This localStorage key is used to force the Cart component to re-render when a product is deleted
                
                localStorage.setItem('cartKey', Date.now());

                navigate('/products')
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }
    };
    
    if (!product) {
        return <div>Loading...</div>;
    }

    // Modify the product on the API

    const handleModify = () => {
        navigate(`/product-editor/${id}`);
    };

    // Add the product to the cart

    const handleSubmit = () => {

        if (!product.attributes.inStock) {
            alert("Ce produit est indisponible actuellement");
            return;
          }

        let storedProducts = JSON.parse(localStorage.getItem('products')) || [];

        const existingProductIndex = storedProducts.findIndex(
            (storedProduct) => storedProduct.id === product.id
        )

        if(existingProductIndex !== -1) {

            if(storedProducts[existingProductIndex].quantity + quantity > 10) {
                alert("Vous ne pouvez pas ajouter plus de 10 exemplaires d'un même produit au panier");
                return;
            }

            storedProducts[existingProductIndex].quantity += quantity;
        } else {
            storedProducts.push({
                id: product.id,
                image: product.attributes.imageSmall.data.attributes.url,
                title: product.attributes.title,
                quantity
            });
        }

        localStorage.setItem('products', JSON.stringify(storedProducts));
        alert(`Vous avez ajouté ${quantity} ${product.attributes.title} au panier`)
    }

    return(
        <ProductCardContainer>
            <ProductCard>
                <ProductCardTitle>{product.attributes.title}</ProductCardTitle>
                <ProductCardImg src={`${process.env.REACT_APP_API_BASE_URL}${window.innerWidth <= 768 ? product.attributes.imageSmall.data.attributes.url : product.attributes.imageLarge.data.attributes.url}`} alt={product.attributes.title} />
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
                        onChange={(e) => {
                            let value = Number(e.target.value);
                            if (value < 1) value = 1;
                            if (value > 10) value = 10;
                            setQuantity(value);
                          }}
                    />
                </label>
                {user && user.username === product.attributes.creator && (
                    <ProductModificationContainer>               
                        <ActionButton onClick={handleModify}>Modifier</ActionButton>
                        <ActionButton onClick={handleDelete}>Supprimer</ActionButton>
                    </ProductModificationContainer>
                )}
            </ProductCard>
            <SubmitButton onClick={handleSubmit}>Ajouter au panier</SubmitButton>
        </ProductCardContainer>
    );
}

