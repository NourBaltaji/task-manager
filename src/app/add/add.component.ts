import { Component } from "@angular/core";
import { TasksService } from "../services/tasks.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent {
  constructor(public tasksService: TasksService, private router: Router) {}
  addTask() {
    this.tasksService.addTask();
    this.router.navigate(["/"]);
  }
}
