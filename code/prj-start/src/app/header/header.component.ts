import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private dataStorageService: DataStorageService,
  ) { }

  ngOnInit() {
  }

  onSaveRecipes() {
    this.dataStorageService.saveRecipes();
  }
  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
