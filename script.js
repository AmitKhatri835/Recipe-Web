const searchbox = document.querySelector('.searchbox')
const searchbtn = document.querySelector('.searchbtn')
const recipecontainer = document.querySelector('.recipe-container')
const popup = document.querySelector('.popup')
const close = document.querySelector('.close')
const recipedetails = document.querySelector('.recipedetails')


// function to get recipe
const fetchrecipe = async (query) => {
    recipecontainer.innerHTML = "<h2>Fetching Recipes......</h2>"
    try {


        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const response = await data.json();

        recipecontainer.innerHTML = " ";
        response.meals.forEach(meal => {
            const recipediv = document.createElement('div')
            recipediv.classList.add('recipe');
            recipediv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs To <span>${meal.strCategory}</span> Category</p>
        `
            const button = document.createElement('button')
            button.textContent = "View Recipe";
            recipediv.appendChild(button)


            // Adding EventListner To Recipe Button

            button.addEventListener('click', () => {
                recipepopup(meal);
            });


            recipecontainer.appendChild(recipediv)
        });
    } catch (error) {
        recipecontainer.innerHTML = `<h2>Error in Fetching Recipes Please Enter a valid Recipe...</h2>`;
    }
}
        // function to fetch ingredients and measurments
const fetchingredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredients = meal[`strIngredient${i}`];
        if (ingredients) {
            const measure = meal[`strMeasure${i}`]
            ingredientsList += `<li>${measure} ${ingredients}</li>`
        }
        else {
            break;
        }
    }
    return ingredientsList;
}


const recipepopup = (meal) => {
    recipedetails.innerHTML = `
        <h2 class="recipename">${meal.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul class="ingredientlist">${fetchingredients(meal)}</ul>
        <div class="instructions">
            <h3>Instructions :</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `

    recipedetails.parentElement.style.display = "block";
}

close.addEventListener('click', () => {
    recipedetails.parentElement.style.display = "none";
})

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    if (!searchinput) {
        recipecontainer.innerHTML = `<h2>Type The Meal You Want To Search.</h2>`;
        return;
    }
    fetchrecipe(searchinput)
});