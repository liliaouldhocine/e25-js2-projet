import { env } from "../config/env.js";
import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
const btnCancel = document.querySelector(".btn-secondary");
let productId;
let errors = [];

const initForm = async () => {
  const params = new URL(window.location.href);
  productId = params.searchParams.get("id");
  if (productId) {
    const response = await fetch(`${env.BACKEND_PRODUCTS_URL}/${productId}`);
    if (response.status < 300) {
      const produit = await response.json();
      fillForm(produit);
    }
  }
};

initForm();

const fillForm = (produit) => {
  const nom = document.querySelector('input[name="nom"]');
  const maison = document.querySelector('input[name="maison"]');
  const prix = document.querySelector('input[name="prix"]');
  const image = document.querySelector('input[name="image"]');
  const description = document.querySelector("textarea");
  nom.value = produit.nom || "";
  maison.value = produit.maison || "";
  prix.value = produit.prix || "";
  image.value = produit.image || "";
  description.value = produit.description || "";
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const produit = Object.fromEntries(formData.entries());
  if (formIsValid(produit)) {
    try {
      const json = JSON.stringify(produit);
      let response;
      if (productId) {
        response = await fetch(`${env.BACKEND_PRODUCTS_URL}/${productId}`, {
          method: "PUT",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        response = await fetch(env.BACKEND_PRODUCTS_URL, {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      if (response.status < 299) {
        window.location.assign("/index.html");
      }
    } catch (e) {
      console.error("e : ", e);
    }
  }
});

function validatePrice(priceString) {
  // Test if it's a valid number
  if (!priceString) {
    return "Le prix est obligatoire !";
  }

  // Check if it's a valid number format
  if (!/^\d*\.?\d+$/.test(priceString)) {
    return "Le format du prix est invalide !";
  }

  // Convert to number
  const price = parseFloat(priceString);

  // Check if positive
  if (price <= 0) {
    return "Le prix doit être supérieur à 0";
  }

  // Check if not too large
  if (price > 1000000) {
    return "Le prix est trop haut !";
  }

  // Check decimal places
  if (priceString.split(".")[1]?.length > 2) {
    return "Mettez deux décimales après le . svp!";
  }

  return true;
}

const formIsValid = (article) => {
  errors = [];
  if (
    !article.nom ||
    !article.maison ||
    !article.prix ||
    !article.image ||
    !article.description
  ) {
    errors.push("Vous devez renseigner tous les champs");
  }

  if (article.description && article.description.length < 20) {
    errors.push("Le contenu de votre article est trop court !");
  }

  let mauvaisPrix = validatePrice(article.prix);
  if (article.prix && mauvaisPrix !== true) {
    errors.push(mauvaisPrix);
  }

  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHTML;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};

btnCancel.addEventListener("click", () => {
  window.location.assign("/index.html");
});
