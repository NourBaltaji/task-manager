import { Component } from "@angular/core";
import { TasksService } from "./services/tasks.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(public TasksService: TasksService) {
    // TasksService.list =TasksService.getList();
    TasksService.getList();
  }
  RemoveItemToEdit() {
    this.TasksService.itemToEdit = "";
  }
  // constructor() {
  //   this.list = this.getList();
  // }

  // ngOnInit(): void {}
}
