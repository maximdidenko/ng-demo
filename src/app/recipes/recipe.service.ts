
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();
    private recipes: Array<Recipe> = [
        new Recipe(
            'Chicken with potatoes', 
            'Chicken with potatoes recipe desription', 
            'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
            [
                new Ingredient('Chicken', 1),
                new Ingredient('Potatoes', 3)
            ]),
        new Recipe(
            'Pizza', 
            'Pizza recipe description', 
            'https://bonmart.com.ua/site/assets/files/4249/about-75-acres-of-pizza-25138.jpg',
            [
                new Ingredient('Meat', 2),
                new Ingredient('Pasta', 3)
            ]),
        new Recipe(
            'Burger', 
            'Burger recipe description', 
            'http://unopizza.ru/assets/images/katalog/sushi/burger-ayam.gif',
            [
                new Ingredient('Bread', 2),
                new Ingredient('Meat', 2),
                new Ingredient('Paper', 1)
            ]),
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Array<Recipe>) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Array<Ingredient>) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}