import {getFiltersRecipes} from './filter';
import {getRecipes,saveRecipes} from './recipes';
import {removeIngredient} from './ingridient';


// Render application recipes
const renderRecipes = () => {
	const recipeList = document.querySelector('#recipe-list');
	const filters = getFiltersRecipes();

	let filteredRecipes = getRecipes().filter((recipe) => {
		return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
	});

	recipeList.innerHTML = '';

	filteredRecipes.forEach(recipe => {
		let recipeElement = generateRecipeDOM(recipe);
		recipeList.appendChild(recipeElement);
	});

	saveRecipes();
};


// Generate the DOM structure for a recipe
const generateRecipeDOM = (recipeElement) => {

	const recipeElem = document.createElement('li');
	const recipeLink = document.createElement('a');
	const recipeTitle = document.createElement('h3');
	const recipeStatus = document.createElement('p');

	recipeElem.className = 'recipe-list__recipeItem'
	recipeLink.className = 'collection-item';


	let hasIngridient = recipeElement.ingredients.filter((ingredient) => ingredient.exist);

	if (recipeElement.title.length > 0) {
		recipeTitle.textContent = recipeElement.title;

	} else {
		recipeElement.title = 'Без названия'
		recipeTitle.textContent = 'Без названия';
	};

	if (hasIngridient.length === 0) {
		recipeStatus.textContent = 'У вас нет никаких ингридиентов';

	} else if (hasIngridient.length === recipeElement.ingredients.length) {
		recipeStatus.textContent = 'У вас имеются все ингридиенты'

	} else if (hasIngridient.length < recipeElement.ingredients.length && hasIngridient.length > 0) {
		recipeStatus.textContent = 'У вас не все ингридиенты';

	};


	recipeLink.setAttribute('href', `edit.html#${recipeElement.id}`)

	recipeLink.appendChild(recipeTitle);
	recipeLink.appendChild(recipeStatus);
	recipeElem.appendChild(recipeLink);

	return recipeElem;
};

// Render application ingredients
const renderIngredients = (recipe) => {

	const ingrediensList = document.querySelector('#list-ingredients');
	ingrediensList.innerHTML = '';

	recipe.ingredients.forEach(ingredient => {
		let ingredientElement = generateIngredientDOM(ingredient, recipe);
		ingrediensList.appendChild(ingredientElement);
	});

	saveRecipes();
};


// Generate the DOM structure for a recipe
const generateIngredientDOM = (ingredientElement, recipe) => {

	const ingredientElem = document.createElement('li');
	const ingredientLabel = document.createElement('label');
	const ingredientFakeCheckbox = document.createElement('span');
	const ingredientText = document.createElement('div');
	const ingredientBtnRemove = document.createElement('button');
	const ingredientCheckbox = document.createElement('input');

	ingredientElem.className = 'ingredient-element';
	ingredientText.className = 'white-text ingridientText';
	ingredientBtnRemove.className = 'remove-ingredient btn-floating btn-small waves-effect waves-light red lighten-1';
	
	ingredientBtnRemove.innerHTML = '<i class="material-icons">remove</i>'

	ingredientText.textContent = ingredientElement.name;
	ingredientCheckbox.setAttribute('type', 'checkbox');

	if (ingredientElement.exist) {
		ingredientCheckbox.className = 'filled-in ';
		ingredientCheckbox.setAttribute('checked', 'checked');
	}

	ingredientLabel.appendChild(ingredientCheckbox);
	ingredientLabel.appendChild(ingredientFakeCheckbox);
	ingredientLabel.appendChild(ingredientText);
	ingredientElem.appendChild(ingredientLabel);
	ingredientElem.appendChild(ingredientBtnRemove);

	ingredientBtnRemove.addEventListener('click', function () {

		removeIngredient(ingredientElement, recipe);
		saveRecipes();
		renderIngredients(recipe);
	});

	ingredientCheckbox.addEventListener('input', function (e) {
		ingredientElement.exist = e.target.checked;
		saveRecipes();
		renderIngredients(recipe);
	});

	return ingredientElem;
};

export {renderRecipes,renderIngredients}