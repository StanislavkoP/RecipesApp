let recipes = getSavedRecipes();

let filters = {
	searchText: '',
}

renderRecipes(recipes, filters);


const btnAddRecipe = document.querySelector('#add-recipe');

btnAddRecipe.addEventListener('click', function () {

	var ID = function () {
		return '_' + Math.random().toString(36).substr(2, 9);
	};


	recipes.push({
		id: ID(),
		title: '',
		guide: '',
		ingredients: []
	});

	renderRecipes(recipes, filters);
});


const inputSearchRecipe = document.querySelector('#search-recipe');

inputSearchRecipe.addEventListener('input', function (e) {
	filters.searchText = e.target.value;

	renderRecipes(recipes, filters);
});


window.addEventListener('storage', (e) => {
	if (e.key === 'recipes') {
		recipes = JSON.parse(e.newValue);
		renderRecipes(recipes, filters);
	}
});