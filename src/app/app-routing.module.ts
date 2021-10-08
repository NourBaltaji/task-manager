import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShowComponent } from "./show/show.component";
import { AddComponent } from "./add/add.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
  { path: "", component: ShowComponent },
  { path: "add", component: AddComponent },
  { path: "edit/:id", component: EditComponent },
];
// AppComponent, TasksComponent, ShowComponent, AddComponent, EditComponent
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
