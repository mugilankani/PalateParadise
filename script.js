var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function getData() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];

        console.log(meal)
        const imageElement = document.querySelector('.chickenimg');
        imageElement.setAttribute('src', meal.strMealThumb);
        const youtube = document.querySelector('.price')
        youtube.addEventListener('click', () => {
            location.href =`${meal.strYoutube}`
        })
        const sourceElement = document.querySelector('.addbutton')
        sourceElement.addEventListener('click',() => {
            location.href =`${meal.strSource}`

        })

        imageElement.addEventListener('click', () => {
            document.getElementById('modalText').innerText = getIngredients(meal).join(', ');
            modal.style.display = "block";
        })
        
    })
    .catch(error => console.error('Error:', error));
}

function getIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (!ingredient) break;
        ingredients.push(`${ingredient} - ${measure}`);
    }
    return ingredients;
}

const foodSearch = document.querySelector('.searchbar');
foodSearch.addEventListener("keydown", (event) => {
    if(event.key == 'Enter'){
        let foodName = foodSearch.value;
        document.querySelector('.usersearchText').innerHTML= foodName
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            const appendList = document.querySelector('.appendlist');
            appendList.innerHTML = '';
            meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.className = 'red';
                mealDiv.innerHTML = `
                    <div class="gray">
                        <img class="chickenimg" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    </div>
                    <div class="des">
                        <h1>${meal.strMeal}</h1>
                        <h3 class="price">${meal.strCategory}</h3>
                        <h3 class="addbutton">WEB</h3>
                    </div>
                `;
                appendList.appendChild(mealDiv);
                mealDiv.addEventListener('click', () => {
                    document.getElementById('modalText').innerText = getIngredients(meal).join(', ');
                    modal.style.display = "block";
                });

                const priceDiv = mealDiv.querySelector('.price');
                priceDiv.addEventListener('click', (event) => {
                    event.stopPropagation(); 
                    window.location.href = meal.strYoutube; 
                });
                const sourceElement = mealDiv.querySelector('.addbutton')
                sourceElement.addEventListener('click',(event) => {
                    event.stopPropagation(); 
                location.href =`${meal.strSource}`
                })

            });
            appendList.scrollIntoView({behavior: "smooth"});
        })
        .catch(error => console.error('Error:', error));
    }
});

getData();