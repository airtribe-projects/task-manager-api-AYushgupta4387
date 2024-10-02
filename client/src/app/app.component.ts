import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  allTasks: any;
  title = 'taskmanager-frontend';

  constructor() {}

  ngOnInit() {
    fetch('http://localhost:3000/api/v1/tasks/2')
      .then((res) => res.json())
      .then((data) => {
        this.allTasks = data?.tasks;
      })
      .catch((error) => {
        console.log('Error fetching tasks:', error);
      });
  }
}
