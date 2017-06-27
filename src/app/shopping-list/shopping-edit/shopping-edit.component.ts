import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  private subscription: Subscription;
  private editMode: boolean = false;
  private editedItemIndex: number;
  private editedItem: Ingredient;

  constructor(private shoppngListService: ShoppingListService) { }

  ngOnInit() { 
    this.subscription = this.shoppngListService.startedEditing
      .subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppngListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  }

  onSubmit(form: NgForm) {
    const formValues = form.value;
    const ingredient = new Ingredient(formValues.name, formValues.amount);
    this.editMode 
      ? this.shoppngListService.updateIngredient(this.editedItemIndex, ingredient) 
      : this.shoppngListService.addIngredient(ingredient);
    this.onReset();
  }

  onReset() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppngListService.removeIngredient(this.editedItemIndex);
    this.onReset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
