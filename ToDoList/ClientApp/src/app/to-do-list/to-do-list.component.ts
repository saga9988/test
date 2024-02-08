import { Component } from '@angular/core';
import { ItemDetail } from '../shared/item-detail';
import { ToDoListService } from '../shared/to-do-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {

  constructor(public toDoListService: ToDoListService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.toDoListService.refreshList();
  }

  populateForm(selectedRecord: ItemDetail) {
    this.toDoListService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this task?')) {
      this.toDoListService.deleteItem(id)
        .subscribe({
          next: res => {
            this.toDoListService.refreshList();
            this.toastr.error("Deleted successfull!", "Task");
          },
          error: err => { console.log(err) }
        })
    }
  }
}
