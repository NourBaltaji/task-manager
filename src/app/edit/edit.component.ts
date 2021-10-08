import { Component, OnInit } from "@angular/core";
import { TasksService } from "../services/tasks.service";
import { Router } from "@angular/router";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  //   list : {
  //   id: number,
  //   date: string,
  //   content: string,
  //   completed: boolean
  // };

  constructor(public TasksService: TasksService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.TasksService.list.map((v, i) => {
    //   if (v.id == this.route.snapshot.params["id"]) this.TasksService.indexOfItemToEdit = i;
    // });
    // const index = this.TasksService.indexOfItemToEdit;
    // this.TasksService.EditTask(index);
  }

  saveTask() {
    this.TasksService.saveTask();
    this.router.navigate(["/"]);
  }
}
