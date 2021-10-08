import { Component, OnInit } from "@angular/core";
import { TasksService } from "../services/tasks.service";

@Component({
  selector: "app-show",
  templateUrl: "./show.component.html",
  styleUrls: ["./show.component.scss"],
})
export class ShowComponent implements OnInit {
  constructor(public TasksService: TasksService) {}
  ngOnInit() {
    this.TasksService.itemToEdit = "";
    this.TasksService.indexOfItemToEdit = -1;
    this.TasksService.inputTask = "";
    this.TasksService.dateTask = "";
  }
}
