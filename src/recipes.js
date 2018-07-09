let recipes = [];

//Load list of recipes
const loadRecipes = () => {
	const recipesJSON = localStorage.getItem('recipes');

	try {
		recipes = recipesJSON ? JSON.parse(recipesJSON) : []

	} catch (e) {
		recipes = []

	}
};



//Get recipes
const getRecipes = () => recipes;

//Save the recipe
const saveRecipes = () => {

	localStorage.setItem('recipes', JSON.stringify(recipes));
}

//Create the recipe
const createRecipe = () => {
	var ID = function () {
		return '_' + Math.random().toString(36).substr(2, 9);
	};

	recipes.push({
		id: ID(),
		title: '',
		guide: '',
		ingredients: []
	});
}

loadRecipes();

export {
	loadRecipes,
	getRecipes,
	saveRecipes,
	createRecipe
}