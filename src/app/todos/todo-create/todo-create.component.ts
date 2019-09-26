import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { PropertyService } from '../../properties/services/property.service';
import { IProperty } from '../../properties/interfaces/IProperty';
import { IPropertyDropdownOption } from './interfaces/IPropertyDropdownOption';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {
  @Input() propertyId: string;
  todoForm: FormGroup;
  propertyOptions: Array<IPropertyDropdownOption> = [];

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: '',
      severity: '',
      propertyId: null
    });
    this.setPropertyDropdownOptions();
  }

  public submitTodo(): void {
    if (this.todoForm.invalid) {
      return console.error('You need to add a title!');
    }
    if (this.propertyId) {
      this.todoForm.value.propertyId = this.propertyId;
    }
    this.todoService.addTodo(this.todoForm.value);
  }

  private setPropertyDropdownOptions(): void {
    this.propertyService
      .getAllProperties()
      .then((propertiesResponse: Array<IProperty>) => {
        this.propertyOptions = propertiesResponse.map(property => {
          return {
            name: property.name,
            id: property._id
          };
        });
      });
  }
}
