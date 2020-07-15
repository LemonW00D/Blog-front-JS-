import "./assets/styles/styles.scss";
import "./index.scss";
import { openModal } from './assets/javascripts/modal';
//import { LoaderOptionsPlugin } from "webpack";

//on récupère les articles à afficher
const articleContainerElement = document.querySelector(".articles-container");
const categoriesContainerElement = document.querySelector('.categories');
const selectElement = document.querySelector('select');
let filter;
let articles;
let sortBy = 'desc';


//pour trier (récent ou ancien)
selectElement.addEventListener('change', (event) => {
  sortBy = selectElement.nodeValue;
  fetchArticle();
});


//transformer les objets (stockés sur serveur) en article
const createArticles = () => {
  //transformer en élément du DOM:
  const articlesDOM = articles.filter((article) => {
    if (filter) {
      return article.category === filter;
    } else {
      return true;
    }
  }).map(article => {
        const articleDOM = document.createElement("div"); //création div
        articleDOM.classList.add("article"); //on donne la class
        //on donne le contenu du HTML:
        articleDOM.innerHTML = `
    <img
      src="${article.img}"
      alt="profile"
    />
    <h2>${article.title}</h2>
    <p class="article-author">${article.author} - ${ (new Date(article.createdAt)).toLocaleDateString("fr-FR", {      //ajout de la date de publication
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }) }</p>
    <p class="article-content">
      ${article.content}
    </p>
    <div class="article-actions">
      <button class="btn btn-danger" data-id=${article._id} >Supprimer</button>
      <button class="btn btn-primary" data-id=${article._id} >Modifier</button>

    </div>
    `;
        return articleDOM; //donne un tableau avec les articles
  });

  //on ajoute tous les articles dans la page web:
  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...articlesDOM);

  //pour rendre le bouton supprimer actif
  const deleteButtons = articleContainerElement.querySelectorAll(".btn-danger"); //on récupère tous les boutons supprimer
  //action
  deleteButtons.forEach(button => {
    button.addEventListener("click", async event => {       //on écoute le click
      const result = await openModal('Etes-vous sûr de vouloir supprimer cet article ?')
      if (result === true) {
        try {
          const target = event.target;
          const articleId = target.dataset.id;
  
          //fetch
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/arnaud-blog/${articleId}`,
            {
              method: "DELETE" //methode
            }
          );
          const body = await response.json();   //ce que retourne le serveur
          console.log(body);
          fetchArticle();  //rafraichir la page avec juste les articles conservés
        } catch (e) {
          console.log("erreur : ", e);
        }
      }      
    });
  });

  //pour rendre le bouton modifier actif
  const editButtons = articleContainerElement.querySelectorAll(".btn-primary"); //on récupère tous les boutons modifier
  editButtons.forEach(button => {
    button.addEventListener("click", event => {
      const target = event.target;
      const articleId = target.dataset.id;
      location.assign(`/form.html?id=${articleId}`);
    });
  });
};


const displayMenuCategories = (categoriesArr) => {
  const lieElements = categoriesArr.map(categoryElem => {
    const li = document.createElement('li');
    li.innerHTML = `${categoryElem[0]} ( <strong>${categoryElem[1]}</strong> )`;
    if (categoryElem[0] === filter) {
      li.classList.add('active');
    };
    li.addEventListener('click', () => {
      if (filter === categoryElem[0]) {
        filter = null;
        li.classList.remove('active');
        createArticles();
      } else {
        filter = categoryElem[0];
      lieElements.forEach(li => {     //on retire la classe active partout avant de sélectionner la nouvelle
        li.classList.remove('active');
      })
      li.classList.add('active');     //pour mettre la calsse active en gras sur le bon élément
      createArticles();
      }      
    })
    return li;
  });
  categoriesContainerElement.innerHTML = '';
  categoriesContainerElement.append(...lieElements);
};


//création menu catégories (nom de catégorie + nb d'articles)
const createMenuCategories = () => {
  const categories = articles.reduce((acc, article) => {
    if (acc[article.category]) {
      acc[article.category]++;
    } else {
      acc[article.category] = 1;
    }
    return acc;
  }, {});

  //transformation en array pour pouvoir exploiter
  const categoriesArr = Object.keys(categories).map((category) => {
    return [category, categories[category]];
  }).sort((c1, c2) => {    //tri par ordre alphabétique des catégories
    c1[0].localCompare(c2[0]);
  });
  displayMenuCategories(categoriesArr);
};

//on récupère les articles sur le serveur via fetch
const fetchArticle = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/arnaud-blog?sort=createdAt:${sortBy}`); //serveur de réponse avec tri plus récent
    articles = await response.json(); //body de la réponse
    createArticles(); //fonction de création d'article à partir des objets stockés sur le serveur
    createMenuCategories();
  } catch (e) {
    console.log("erreur : ", e);
  }
};

//on invoque la fonction de récupération des articles
fetchArticle();