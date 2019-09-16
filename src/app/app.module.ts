import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PropertyFormComponent } from './views/property-form/property-form.component';
import { PropertyListComponent } from './views/property-list/property-list.component';
import { PropertySummaryComponent } from './views/property-summary/property-summary.component';
import { TodoListComponent } from './business/todos/todo-list/todo-list.component';
import { TodoCreateComponent } from './business/todos/todo-create/todo-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    PropertyFormComponent,
    PropertyListComponent,
    PropertySummaryComponent,
    TodoListComponent,
    TodoCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
