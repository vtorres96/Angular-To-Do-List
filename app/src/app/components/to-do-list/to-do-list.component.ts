import { Component, OnInit } from '@angular/core';
import { Tasks } from "../../interfaces/Tasks";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(200, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]),

    ])
  ]
})
export class ToDoListComponent implements OnInit {

  tasks: Tasks[];
  taskTitle: string;
  idForTasks: number;
  beforeEditCache: string;
  filter: string;

  constructor() { }

  ngOnInit(): void {
    this.filter = 'all';
    this.idForTasks = 4;
    this.taskTitle = '';
    this.tasks = [
      {
        'id': 1,
        'title': 'task one',
        'completed': false,
        'edited': false
      },
      {
        'id': 2,
        'title': 'task two',
        'completed': false,
        'edited': false
      },
      {
        'id': 3,
        'title': 'task three',
        'completed': false,
        'edited': false
      }
    ]
  }

  addTask(): void {
    if (this.taskTitle.trim().length === 0) {
      return;
    }

    this.tasks.push({
      id: this.idForTasks,
      title: this.taskTitle,
      completed: false,
      edited: false
    })

    this.taskTitle = '';
    this.idForTasks++;
  }

  editTask(task: Tasks): void {
    this.beforeEditCache = task.title;
    task.edited = true;
  }

  doneEdit(task: Tasks): void {
    if(task.title.trim().length === 0){
      task.title = this.beforeEditCache;
    }

    task.edited = false;
  }

  cancelEdit(task: Tasks): void {
    task.title = this.beforeEditCache;
    task.edited = true;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  remaining(): number {
    return this.tasks.filter(task => !task.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.tasks.filter(task => task.completed).length > 0;
  }

  clearCompleted(): void {
    this.tasks = this.tasks.filter(task => !task.completed);
  }

  checkAllTasks(): void {
    this.tasks.forEach(task => task.completed = (<HTMLInputElement>event.target).checked)
  }

  tasksFiltered(): Tasks[] {
    if(this.filter === 'all'){
      return this.tasks;
    } else if (this.filter === 'active'){
      return this.tasks.filter(task => !task.completed)
    } else if (this.filter === 'completed'){
      return this.tasks.filter(task => task.completed)
    }
  }
}
