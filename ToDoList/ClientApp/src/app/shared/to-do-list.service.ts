import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ItemDetail } from './item-detail';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  url: string = '';
  list: ItemDetail[] = [];
  formData: ItemDetail = new ItemDetail();
  formSubmitted: boolean = false;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl + 'items';
  }

  refreshList() {
    this.http.get(this.url)
      .subscribe({
        next: res => {
          this.list = res as ItemDetail[];
        },
        error: err => {
          console.log(err);
        }
      })
  }

  postItem() {
    return this.http.post(this.url, this.formData)
  }

  putItem() {
    return this.http.put(this.url + '/' + this.formData.id, this.formData);
  }

  deleteItem(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new ItemDetail();
    this.formSubmitted = false;
  }
}
