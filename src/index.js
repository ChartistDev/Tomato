
import "./style.css";
var data = [
    {name: "Subway",id: 1, rating: 4.1, ETA: 25, location: "Behala", tags: ["American", "Fast-food"]},
    {name: "Alibaba",id: 2, rating: 3.9, ETA: 60, location: "Barabazar", tags: ["Indian", "Vegetarian"]},
    {name: "Wow Momo",id: 3, rating: 4.5, ETA: 20, location: "Esplanade", tags: ["Chinese", "Fast-food"]},
];
var searchrestaurant = debounce(search, 200);
function debounce(fn, delay) {
    let timeout;
    return function() {
        let obj = this,
            args = arguments
        if(timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(()=>{
            fn.apply(obj, args);
        },delay)
    }
}

function search(input) {
    let newData = data.filter((value)=> {
       return (value.name.includes(input.target.value));
    });
    clearPage();
    displayRestaurants(newData);
}

var searchField = document.querySelector("#searchFieldDiv").querySelector("input");
var sortRestaurant = document.querySelector("#sortRestaurant");
var list = document.querySelector("#restaurantList");
var filterRestaurant = document.querySelector("#filterRestaurant");
    searchField.addEventListener("keyup", searchrestaurant);
    sortRestaurant.addEventListener("change", mysort);
    list.addEventListener("click", (e) => {

        toggleFavourites(e);
    });

 function toggleFavourites(event) {
    console.log(event.target);
 }

 function dynamicSort(key, order = 'asc') {
    return function(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }
    
        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key];
    
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        );
      };
 }   
//var sortBynumber = (a, b) => a[];
function mysort() {
    let option = sortRestaurant.value;
            let newData = data.sort(dynamicSort(option, 'asc'));
            clearPage();
            displayRestaurants(newData);
}
function createCard(restaurant) {
    let data = restaurant;
    let container = document.createElement("div");
//    let heading = document.createElement("h3");
//         heading.style.textAlign = "center";
//         heading.appendChild(document.createTextNode(data.name));
    
     container.setAttribute("class", "card");
    let content = "<h3 style = 'text-align: center;'>"+ data.name + "</h3><h4 style = 'text-align: center; margin: 10px;'>Rating: "+ data.rating + "</h4><h4 style = 'text-align: center; margin: 10px;'> E.T.A: "+ data.ETA + "</h4>";
    container.innerHTML = content;
    return container;
}



function displayRestaurants (restaurants) {
    let data = restaurants;
    if(data) {
        data.forEach(element => {
            let card = createCard(element);
            list.appendChild(card);
        });
    }
}
function clearPage() {
    let firstChild = list.firstElementChild;
        while(firstChild) {
            firstChild.remove();
            firstChild = list.firstElementChild;
        }
}
displayRestaurants(data);


export default searchrestaurant;