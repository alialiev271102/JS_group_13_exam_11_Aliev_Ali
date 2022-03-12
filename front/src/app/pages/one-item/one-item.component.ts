import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ApiItemData, Item} from "../../models/item.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/type";
import {fetchItemsRequest} from "../../store/item.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../services/item.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ApiCategoryData, CategoryModel} from "../../models/category.model";

@Component({
  selector: 'app-one-item',
  templateUrl: './one-item.component.html',
  styleUrls: ['./one-item.component.css']
})
export class OneItemComponent implements OnInit {

  items: Observable<Item[]>
  loading: Observable<boolean>
  error: Observable<null | string>
  itemId: string | null
  categories: Observable<CategoryModel[]>

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>,
              private itemService: ItemService,
              private http: HttpClient) {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.items = this.itemService.getItems();
    this.categories = this.itemService.getCategories();
    this.loading = store.select(state => state.items.fetchLoading);
    this.error = store.select(state => state.items.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchItemsRequest());
  }
}
