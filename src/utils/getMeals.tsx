import { MealProps } from '../components/MealType';
import { Category } from '../components/ListRecipes';

/* export const getMeals = () => {
    return fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((response) => response.json())
    .then((responseJson => {
        var mealList: MealProps[];
        responseJson.categories.map((category: Category) => {
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
            .then((mealResponse) => mealResponse.json())
                mealList.concat(responseJson);
            }) */