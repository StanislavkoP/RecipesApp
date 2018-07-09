import {createRecipe,saveRecipes, loadRecipes} from './recipes';
import {setFiltersRecipes} from './filter';
import {renderRecipes} from './view';

renderRecipes();

const btnAddRecipe = document.querySelector('#add-recipe');

btnAddRecipe.addEventListener('click', function () {
	createRecipe();
	saveRecipes();
	renderRecipes();
});


const inputSearchRecipe = document.querySelector('#search-recipe');

inputSearchRecipe.addEventListener('input', function (e) {

	setFiltersRecipes({
		searchText: e.target.value
	});
	renderRecipes();
});


window.addEventListener('storage', (e) => {
	if (e.key === 'recipes') {
		recipes = JSON.parse(e.newValue);
		renderRecipes();
	}
});