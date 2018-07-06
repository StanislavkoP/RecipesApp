//Get saves list of recipes
const getSavedRecipes = function () {
	const recipesJSON = localStorage.getItem('recipes');

	try {
		return recipesJSON ? JSON.parse(recipesJSON) : []

	} catch (e) {
		return []
	}

};


//Save a recipe
const saveRecipes = function (recipes) {
	localStorage.setItem('recipes', JSON.stringify(recipes));
}


// Render application recipes
const renderRecipes = (recipes, filters) => {
	const recipeList = document.querySelector('#recipe-list');

	let filteredRecipes = recipes.filter((recipe) => {
		return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
	})

	recipeList.innerHTML = '';

	filteredRecipes.forEach(recipe => {
		let recipeElement = generateRecipeDOM(recipe);
		recipeList.appendChild(recipeElement);
	});

	saveRecipes(recipes);
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
		let ingredientElement = generateIngredientDOM(ingredient);
		ingrediensList.appendChild(ingredientElement);
	});

	saveRecipes(recipes);
};

const removeIngredient = (ingredientSearched, recipe) => {
	const ingredientIndex = recipe.ingredients.findIndex((ingredient) => {
		return ingredient.name === ingredientSearched.name;
	});

	if (ingredientIndex > -1) {
		recipe.ingredients.splice(ingredientIndex, 1)
	}
}

// Generate the DOM structure for a recipe
const generateIngredientDOM = (ingredientElement) => {

	const ingredientElem = document.createElement('li');
	const ingredientLabel = document.createElement('label');
	const ingredientText = document.createElement('span');
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
	ingredientLabel.appendChild(ingredientText);
	ingredientElem.appendChild(ingredientLabel);
	ingredientElem.appendChild(ingredientBtnRemove);

	ingredientBtnRemove.addEventListener('click', function (e) {
		removeIngredient(ingredientElement, recipe);
		saveRecipes(recipes);
		renderIngredients(recipe);
	});

	ingredientCheckbox.addEventListener('input', function (e) {
		ingredientElement.exist = e.target.checked;
		saveRecipes(recipes);
		renderIngredients(recipe);
	});

	return ingredientElem;
};