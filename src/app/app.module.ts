import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TasksComponent } from "./tasks/tasks.component";
import { FormsModule } from "@angular/forms";
import { ShowComponent } from "./show/show.component";
import { AddComponent } from "./add/add.component";
import { EditComponent } from "./edit/edit.component";
import { TasksService } from "./services/tasks.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, TasksComponent, ShowComponent, AddComponent, EditComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [TasksService],
  bootstrap: [AppComponent],
})
export class AppModule {}
