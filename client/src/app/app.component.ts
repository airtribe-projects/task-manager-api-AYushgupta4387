import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import axios from 'axios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  allTasks: any;
  title = 'Task Manager';

  constructor() {}

  ngOnInit() {}

  getAllTasks() {
    axios
      .get('http://localhost:3000/api/v1/tasks')
      .then((response) => {
        this.allTasks = response.data?.tasks;
      })
      .catch((error) => {
        console.log('Error fetching tasks:', error);
      });
  }
}
