import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { AddComponent } from './pages/add/add.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TransactionsRoutingModule } from './transactions-routing.module';

@NgModule({
  declarations: [NavbarComponent, HomeComponent, AddComponent, ListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TransactionsRoutingModule,
    RouterModule,
  ],
})
export class TransactionsModule {}
