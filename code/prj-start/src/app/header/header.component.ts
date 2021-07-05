import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSubscription: Subscription
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
   this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  onSaveRecipes() {
    this.dataStorageService.saveRecipes();
  }
  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();;
  }
  ngOnDestroy():void {
    this.userSubscription.unsubscribe();
  }
}
