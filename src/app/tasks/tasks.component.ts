import { Component } from "@angular/core";
import { TasksService } from "../services/tasks.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent {
  constructor(public TasksService: TasksService, private router: Router) {}
  // EditTask(index: number) {
  //   this.showList = false;
  //   this.itemToEdit = this.list[index];
  //   this.indexOfItemToEdit = index;
  //   this.inputTask = this.itemToEdit.content;
  //   this.dateTask = this.itemToEdit.date;
  // }

  EditTask(id: string) {
    // this.TasksService.EditTask(index);
    this.router.navigate(["/edit", id]);
    this.TasksService.list.map((v, i) => {
      if (v.id == id) this.TasksService.indexOfItemToEdit = i;
    });
    const index = this.TasksService.indexOfItemToEdit;
    this.TasksService.EditTask(index);
  }
}
