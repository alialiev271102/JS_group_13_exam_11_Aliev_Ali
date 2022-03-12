import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Item} from "../../models/item.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/type";
import {fetchItemsRequest} from "../../store/item.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-one-item',
  templateUrl: './one-item.component.html',
  styleUrls: ['./one-item.component.css']
})
export class OneItemComponent implements OnInit {

  items: Observable<Item[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>,
              private itemService: ItemService) {
    const itemId = this.route.snapshot.paramMap.get('id');
    this.items = this.itemService.getItem(itemId);
    console.log();
    this.loading = store.select(state => state.items.fetchLoading);
    this.error = store.select(state => state.items.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchItemsRequest());
  }
}
