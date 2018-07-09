import {getRecipes,saveRecipes} from './recipes';
import {renderIngredients} from './view'


const titleRecipe = document.querySelector('#name-recipe');
const guideRecipe = document.querySelector('#guide-recipe');
const btnAddIngredient = document.querySelector('#add-indredient');
const btnRemoveRecipe = document.querySelector('#btn-removeRecipe');
const btnSaveRecipe = document.querySelector('#save-recipe');
const btnBackToListRecipes = document.querySelector('#btn-backToList');



const recipeId = location.hash.substring(1);
let recipes = getRecipes();

let recipe = recipes.find((recipe) => recipe.id === recipeId);

if (!recipe) {
	location.assign('/index.html')
}


titleRecipe.value = recipe.title;
guideRecipe.textContent = recipe.guide;

renderIngredients(recipe);

titleRecipe.addEventListener('input', function (e) {
	recipe.title = e.target.value.trim();
	saveRecipes();
});

guideRecipe.addEventListener('input', function (e) {
	recipe.guide = e.target.value;
	saveRecipes();
});

btnAddIngredient.addEventListener('click', function () {
	const newIngredient = document.querySelector('#add-ingredient-text');

	if ( newIngredient.value.trim().length != 0 ) {
		recipe.ingredients.push({
			name: newIngredient.value.trim(),
			exist: false,
		});
		renderIngredients(recipe);
		newIngredient.value = '';
		
	} else {
		alert('Введите название ингредиента')
	}

});

btnRemoveRecipe.addEventListener('click', function () {
	const recipeIndex = recipes.findIndex((recipe) => {
		return recipe.id === recipeId;
	});

	if (recipeIndex > -1) {
		recipes.splice(recipeIndex, 1)
	}

	saveRecipes();
	renderIngredients(recipe);
	location.assign('/index.html')
});



btnSaveRecipe.addEventListener('click', function () {
	location.assign('/index.html')
});

btnBackToListRecipes.addEventListener('click', function () {
	location.assign('/index.html')
});


window.addEventListener('storage', (e) => {
	if (e.key === 'recipes') {
		recipes = JSON.parse(e.newValue)
		recipe = recipes.find((recipe) => recipe.id === recipeId)

		if (!recipe) {
			location.assign('/index.html')
		}

		titleRecipe.value = recipe.title;
		guideRecipe.textContent = recipe.guide;
	}
})