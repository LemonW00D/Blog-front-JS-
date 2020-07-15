//pour transformer la topbar en version mobile (sandwich et menu déroulant)

const iconMobile = document.querySelector(".header-menu-icon"); //on récupère l'icone
const headerMenu = document.querySelector(".header-menu"); //récupère la liste du menu
let isMenuOpen = false; //savoir si le menu est ouvert ou fermé
let mobileMenuDOM; //pour créer le menu

//méthode pour fermer le menu
const closeMenu = () => {
  mobileMenuDOM.classList.remove("open"); //retire la class open => change le css
};

//méthode pour créer le menu
const createMobileMenu = () => {
  mobileMenuDOM = document.createElement("div"); //on crée la div
  mobileMenuDOM.classList.add("mobile-menu"); //on ajoute une class
  mobileMenuDOM.addEventListener("click", event => {    //on ajoute l'action
    event.stopPropagation();   //pour ne pas que le window récupère le clic
  });
  mobileMenuDOM.append(headerMenu.querySelector("ul").cloneNode(true)); //on copie la node ul et son contenu pour former la liste (pas d'intéraction, on injecte une copie)
  headerMenu.append(mobileMenuDOM); //on l'ajoute à l'intérieur du menu
};

//méthode pour ouvrir le menu
const openMenu = () => {
  if (mobileMenuDOM) {
  } else {
    createMobileMenu();
  }
  mobileMenuDOM.classList.add("open"); //ajout de la class open => change le css
};

//savoir si le menu est déjà ouvert; si oui, le clic le ferme, si non il ouvre le menu
const toggleMobileMenu = event => {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
  isMenuOpen = !isMenuOpen; //permet de fermer si on clic
};

//on écoute le click du bouton
iconMobile.addEventListener("click", event => {
  event.stopPropagation();   //pour ne pas que cela se propage sur l'objet window
  toggleMobileMenu(); //on lance l'action
});

//si le 
window.addEventListener("click", () => {
  if (isMenuOpen) {
    toggleMobileMenu(); //on lance l'action de fermeture
  }
});

//permet de faire disparaitre si on resize la fenetre et que le menu est ouvert
window.addEventListener("resize", event => {
  if (window.innerWidth > 480 && isMenuOpen) {   //le menu se ferme si on passe au-dessus de 480px
    toggleMobileMenu();  //action fermeture
  }
});
