import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { DeleteComponent } from './components/delete/delete.component';
import { EditComponent } from './components/edit/edit.component';
import { AddComponent } from './pages/add/add.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { SnackbarService } from './services/snackbar.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TransactionsRoutingModule } from './transactions-routing.module';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    AddComponent,
    ListComponent,
    DeleteComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TransactionsRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SnackbarService],
})
export class TransactionsModule {}
