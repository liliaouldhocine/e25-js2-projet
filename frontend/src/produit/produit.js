import "../assets/styles/styles.scss";
import "./produit.scss";
import getNavMenu from "../../components/navigation/index.js";

getNavMenu("product");

const content = document.querySelector(".content");

const getProductIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
};

const displayProduct = (product) => {
  content.innerHTML = `
     <div class="card p-20 product-container">
          <div class="product">
              <div class="product-image">
                  <img src="${product.image}" alt="${product.nom}" srcset="">
              </div>
              <div class="px-20 product-details">
                  <div class="brand"><h2>${product.maison}</h2></div>
                  <div class="title"><h1>${product.nom}</h1></div>
                  <div class="price"><h3>${product.prix}$ (CAD)</h3></div>
                  <div class="description"><p>${product.description}</p></div>
              </div>
          </div>
      </div>
  `;
};

// Usage when the product page loads
window.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromUrl();
  fetchProduit(productId);
});

const fetchProduit = async (id) => {
  try {
    const response = await fetch(`http://localhost:5252/products/${id}`);
    let produit = await response.json();
    displayProduct(produit);
  } catch (e) {
    window.location.href = "/";
  }
};
