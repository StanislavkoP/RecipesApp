
//Remove ingridient from list
const removeIngredient = (ingredientSearched, recipe) => {
	const ingredientIndex = recipe.ingredients.findIndex((ingredient) => {
		return ingredient.name === ingredientSearched.name;
	});

	if (ingredientIndex > -1) {
		recipe.ingredients.splice(ingredientIndex, 1)
	}
}

export {removeIngredient}
