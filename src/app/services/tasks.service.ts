import { List } from "../models/list";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Number } from "mongoose";

@Injectable()
export class TasksService {
  // showList = true;
  itemToEdit: any = "";
  indexOfItemToEdit: number = -1;
  list: List[] = [];
  inputTask: string = "";
  dateTask = "";
  todayDate = new Date();

  constructor(private http: HttpClient) {}

  toggleDone(index: number) {
    let id = this.list[index].id;

    this.http.put<{ message: string }>(`http://localhost:3000/api/item/${id}`, this.list[index]).subscribe((ResponseData) => {
      console.log(ResponseData.message);
      this.list.map((v) => {
        if (v.id == id) v.completed = !v.completed;
        return v;
      });
    });
  }

  deleteTask(index: number) {
    let id = this.list[index].id;
    // this.setlocalStorage(this.list);
    this.http.delete<{ message: string }>(`http://localhost:3000/api/list/${id}`).subscribe((ResponseData) => {
      this.list = this.list.filter((v) => v.id !== id);
    });
  }
  addTask() {
    let ID;
    if (this.list.length === 0) {
      ID = "0";
    } else {
      ID = this.list[this.list.length - 1].id + 1;
    }
    let Post = {
      id: ID,
      date: this.dateTask,
      content: this.inputTask,
      completed: false,
    };
    console.log(this.dateTask);
    this.http.post<{ message: string; taskId: string }>("http://localhost:3000/api/list", Post).subscribe((ResponseData) => {
      const taskId = ResponseData.taskId;
      Post.id = taskId;
      this.list.push(Post);
    });

    // console.log(this.list);

    this.inputTask = "";
    this.dateTask = "";
    // this.setlocalStorage(this.list);
  }

  EditTask(index: number) {
    // this.showList = false;
    this.itemToEdit = this.list[index];
    this.indexOfItemToEdit = index;
    this.inputTask = this.itemToEdit.content;
    this.dateTask = this.itemToEdit.date;
    console.log(this.dateTask);
  }
  saveTask() {
    this.itemToEdit.content = this.inputTask;
    this.itemToEdit.date = this.dateTask;
    this.list[this.indexOfItemToEdit] = this.itemToEdit;

    // this.showList = true;
    this.http.put<{ message: string }>(`http://localhost:3000/api/list/${this.itemToEdit.id}`, this.itemToEdit).subscribe((ResponseData) => {
      console.log(ResponseData.message);
    });
    this.itemToEdit = "";
    this.indexOfItemToEdit = -1;
    this.inputTask = "";
    this.dateTask = "";
    // this.setlocalStorage(this.list);
  }
  taskState(date: string) {
    const todayDateString = this.todayDate.getFullYear() + "-" + (this.todayDate.getMonth() + 1) + "-" + this.todayDate.getDate(); // 2021 -  8 - 15
    const due: any = new Date(date);
    const now: any = new Date(todayDateString);
    const diffTime = Math.abs(due - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60));
    let state = "";
    if (due < now) {
      state = "urgent";
    } else if (diffDays < 24) {
      state = "inprogress";
    } else {
      state = "upcoming";
    }
    return state;
  }
  getList() {
    this.http
      .get<{ message: string; list: any }>("http://localhost:3000/api/list")
      .pipe(
        map((listData) => {
          return listData.list.map((task: any) => {
            return {
              id: task._id,
              date: task.date,
              content: task.content,
              completed: task.completed,
            };
          });
        })
      )
      .subscribe((transformedList) => {
        this.list = transformedList;
      });
  }
  // getList(): List[] {
  //   let localStorageItem;
  //   if (localStorage.getItem("list")) {
  //     localStorageItem = JSON.parse(localStorage.getItem("list")!).list;
  //   } else {
  //     localStorageItem = [];
  //   }
  //   return localStorageItem;
  // }
  setlocalStorage(list: List[]) {
    localStorage.setItem("list", JSON.stringify({ list: list }));
  }
}
