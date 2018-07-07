const ingredientElement = document.querySelectorAll('.ingredient-element')
const titleRecipe = document.querySelector('#name-recipe');
const guideRecipe = document.querySelector('#guide-recipe');
const btnAddIngredient = document.querySelector('#add-indredient');
const btnRemoveRecipe = document.querySelector('#btn-removeRecipe');

const recipeId = location.hash.substring(1);
let recipes = getSavedRecipes();
let recipe = recipes.find((recipe) => recipe.id === recipeId);

if (!recipe) {
	location.assign('/index.html')
}

titleRecipe.value = recipe.title;
guideRecipe.textContent = recipe.guide;

renderIngredients(recipe);

titleRecipe.addEventListener('input', function (e) {
	recipe.title = e.target.value.trim();
	saveRecipes(recipes);
});

guideRecipe.addEventListener('input', function (e) {
	recipe.guide = e.target.value;
	saveRecipes(recipes);
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

	saveRecipes(recipes);
	renderIngredients(recipe);
	location.assign('/index.html')
});


const btnBackToListRecipes = document.querySelector('#save-recipe');

btnBackToListRecipes.addEventListener('click', function () {
	location.assign('/index.html')
});



window.addEventListener('storage', (e) => {
	if (e.key === 'recipes') {
		recipes = JSON.parse(e.newValue)
		note = recipes.find((recipe) => recipe.id === recipeId)

		if (!recipe) {
			location.assign('/index.html')
		}

		titleRecipe.value = recipe.title;
		guideRecipe.textContent = recipe.guide;
	}
})