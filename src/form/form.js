import "../assets/styles/styles.scss";
import "./form.scss";
import { openModal } from "./../assets/javascripts/modal";

//variables
const form = document.querySelector("form");  //on récupère les données du formulaire
const errorElement = document.querySelector("#errors");  //on récupère les erreurs
const btnCancel = document.querySelector(".btn-secondary"); //on récupère le bouton Annuler
let errors = [];  //les erreurs sont colligés dans un tableau vide
let articleId;

//pour modifier un article, récupérer chaque élément déjà rentré
const fillForm = article => {
  const author = document.querySelector('input[name="author"]');
  const img = document.querySelector('input[name="img"]');
  const category = document.querySelector('input[name="category"]');
  const title = document.querySelector('input[name="title"]');
  const content = document.querySelector("textarea");
  author.value = article.author || "";
  img.value = article.img || "";
  category.value = article.category || "";
  title.value = article.title || "";
  content.value = article.content || "";
};

const initForm = async () => {
  const params = new URL(location.href);
  articleId = params.searchParams.get('id'); //on récupère l'ID de notre article

  if (articleId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/arnaud-blog/${articleId}`)
    if (response.status < 300) {
      const article = await response.json();
      fillForm(article);
    }
  };
};

initForm();

btnCancel.addEventListener('click', async () => {    //sin on clic sur Annuler retour à page Index
  const result = await openModal('Si vous quittez la page, vous allez perdre votre article.')
  if (result) {
    location.assign('/index.html');
  }
})

//soumission du formulaire
form.addEventListener("submit", async event => {
  event.preventDefault();  //empecher le rechargement naturel de la page
  const formData = new FormData(form);  //transforme en données pour envoie en JSON après
  const article = Object.fromEntries(formData.entries());  //récupération des entrées/données + création d'un objet avec ces données
  
  //on va chercher à vérifier la validité du formulaire
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);   //transformation au format JSON pour envoi au serveur
      let response;
      if (articleId) {   //dans le cas de l'édition d'un article existant
      response = await fetch(`https://jsonplaceholder.typicode.com/posts/arnaud-blog/${articleId}`, {
        method: "PATCH", //fetch d'envoi
        body: json,
        headers: {
          "Content-Type": "application/json"   //format
        }
      });
      } else {   //dans le cas d'une nouvelle soumission d'article
        // pour sauvegarder les articles=backend pendant 10h(test de Dyma)
      response = await fetch("https://jsonplaceholder.typicode.com/posts/arnaud-blog", {
        method: "POST", //fetch d'envoi
        body: json,
        headers: {
          "Content-Type": "application/json; charset=UTF-8"   //format
        }
      });
      };      
      if (response.status < 300) {   //on redirige l'utilisateur si status ok
        location.assign('/index.html');
      }
    } catch (e) {
      console.error("e : ", e);
    }
  }
});


//état/validité du formulaire
const formIsValid = article => {
  errors = [];   //evite d'avoir des doublons d'erreurs
  //voir si un élément est manquant dans le formulaire
  if (
    !article.author ||
    !article.image ||
    !article.category ||
    !article.content ||
    !article.title
  ) {
    errors.push("Vous devez renseigner tous les champs");
  } else {
    errors = [];
  }

  //voir si le contenu est assez long, on parcours le tableau d'erreur initialement vide
  if (article.content.length < 20) {
    errors.push("Le contenu de votre article est trop court !");
  } else {
    errors = [];
  }
  
  //affichage du message d'erreur
  if (errors.length) {
    let errorHTML = "";
    errors.forEach(e => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHTML;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};