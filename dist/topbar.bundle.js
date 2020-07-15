/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/javascripts/topbar.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/javascripts/topbar.js":
/*!******************************************!*\
  !*** ./src/assets/javascripts/topbar.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//pour transformer la topbar en version mobile (sandwich et menu déroulant)
var iconMobile = document.querySelector(".header-menu-icon"); //on récupère l'icone

var headerMenu = document.querySelector(".header-menu"); //récupère la liste du menu

var isMenuOpen = false; //savoir si le menu est ouvert ou fermé

var mobileMenuDOM; //pour créer le menu
//méthode pour fermer le menu

var closeMenu = function closeMenu() {
  mobileMenuDOM.classList.remove("open"); //retire la class open => change le css
}; //méthode pour créer le menu


var createMobileMenu = function createMobileMenu() {
  mobileMenuDOM = document.createElement("div"); //on crée la div

  mobileMenuDOM.classList.add("mobile-menu"); //on ajoute une class

  mobileMenuDOM.addEventListener("click", function (event) {
    //on ajoute l'action
    event.stopPropagation(); //pour ne pas que le window récupère le clic
  });
  mobileMenuDOM.append(headerMenu.querySelector("ul").cloneNode(true)); //on copie la node ul et son contenu pour former la liste (pas d'intéraction, on injecte une copie)

  headerMenu.append(mobileMenuDOM); //on l'ajoute à l'intérieur du menu
}; //méthode pour ouvrir le menu


var openMenu = function openMenu() {
  if (mobileMenuDOM) {} else {
    createMobileMenu();
  }

  mobileMenuDOM.classList.add("open"); //ajout de la class open => change le css
}; //savoir si le menu est déjà ouvert; si oui, le clic le ferme, si non il ouvre le menu


var toggleMobileMenu = function toggleMobileMenu(event) {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }

  isMenuOpen = !isMenuOpen; //permet de fermer si on clic
}; //on écoute le click du bouton


iconMobile.addEventListener("click", function (event) {
  event.stopPropagation(); //pour ne pas que cela se propage sur l'objet window

  toggleMobileMenu(); //on lance l'action
}); //si le 

window.addEventListener("click", function () {
  if (isMenuOpen) {
    toggleMobileMenu(); //on lance l'action de fermeture
  }
}); //permet de faire disparaitre si on resize la fenetre et que le menu est ouvert

window.addEventListener("resize", function (event) {
  if (window.innerWidth > 480 && isMenuOpen) {
    //le menu se ferme si on passe au-dessus de 480px
    toggleMobileMenu(); //action fermeture
  }
});

/***/ })

/******/ });
//# sourceMappingURL=topbar.bundle.js.map