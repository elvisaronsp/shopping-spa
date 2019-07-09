import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model';
import { OrderHttpService } from 'src/app/services/http/order-http.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Array < Order > = [];

  orderId: number;

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  searchText: string;

  sortColumn = {column: 'created_at', sort: 'desc'};

  constructor(private orderHttp: OrderHttpService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    }).subscribe(response => {
      this.orders = response.data;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page;
    });
  }

  sort(sortColumn) {
    this.getOrders();
  }
  pageChanged(page) {
    this.pagination.page = page;
    this.getOrders();
  }

  search($event) {
    this.searchText = $event;
    this.getOrders();
  }

}
