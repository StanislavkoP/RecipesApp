let filters = {
	searchText: '',
}

const getFiltersRecipes = () => filters;

const setFiltersRecipes = ( setFilters ) => {
	if(typeof setFilters.searchText === 'string') {
		filters.searchText = setFilters.searchText;
	}
};

export {getFiltersRecipes, setFiltersRecipes}