import { Component } from '@angular/core';
import { ItemDetail } from '../shared/item-detail';
import { ToDoListService } from '../shared/to-do-list.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-detail-form',
  templateUrl: './item-detail-form.component.html',
  styleUrls: ['./item-detail-form.component.css']
})
export class ItemDetailFormComponent {
  constructor(public toDoListService: ToDoListService, private toastr: ToastrService) { }


  onSubmit(form: NgForm) {
    this.toDoListService.formSubmitted = true;
    if (form.valid) {
      if (this.toDoListService.formData.id == 0)
        this.insertRecord(form);
      else
        this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.toDoListService.postItem()
      .subscribe({
        next: res => {
          this.toDoListService.list = res as ItemDetail[]
          this.toDoListService.resetForm(form);
          this.toastr.success('Inserted successfully!', 'Task');
        },
        error: err => {
          console.log(err);
        }
      })
  }

  updateRecord(form: NgForm) {
    this.toDoListService.putItem()
      .subscribe({
        next: res => {
          this.toDoListService.refreshList();
          this.toDoListService.resetForm(form);
          this.toastr.info('Updated successfully!', 'Task');
        },
        error: err => {
          console.log(err);
        }
      })
  }
}
