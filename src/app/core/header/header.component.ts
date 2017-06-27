import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private dsService: DataStorageService) {}
  
  onSaveData() {
    this.dsService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  onFetchData() {
    this.dsService.getRecepies();
  }
 }
