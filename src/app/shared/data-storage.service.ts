import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService) { }

    storeRecipes() {
        return this.http.put('https://ng-recipe-book-dfdc6.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    getRecepies() {
        this.http.get('https://ng-recipe-book-dfdc6.firebaseio.com/recipes.json')
            .map((response: Response) => {
                const recipes: Array<Recipe> = response.json();
                recipes.forEach((recipe: Recipe) => {
                    if (!recipe.ingredients) {
                        recipe.ingredients = [];
                    }
                });
                return recipes;
            })
            .subscribe((recipes: Array<Recipe>) => {
                this.recipeService.setRecipes(recipes);
            });
    }
}