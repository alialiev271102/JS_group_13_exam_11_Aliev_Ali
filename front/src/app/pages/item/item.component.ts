import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Item} from "../../models/item.model";
import {AppState} from "../../store/type";
import {Store} from "@ngrx/store";
import {fetchItemsRequest} from "../../store/item.actions";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: Observable<Item[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.items = store.select(state => state.items.items);
    this.loading = store.select(state => state.items.fetchLoading);
    this.error = store.select(state => state.items.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchItemsRequest());
  }

}
