import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  createItemsFail,
  createItemsRequest,
  createItemsSuccess,
  fetchItemsFail,
  fetchItemsRequest,
  fetchItemsSuccess
} from "./item.actions";
import {catchError, mergeMap, of, map, tap} from "rxjs";
import {Router} from "@angular/router";
import {ItemService} from "../services/item.service";

@Injectable()


export class ItemEffects {
  fetchItems = createEffect(() => this.actions.pipe(
    ofType(fetchItemsRequest),
    mergeMap(() => this.itemService.getItems().pipe(
      map(items => fetchItemsSuccess({items})),
      catchError(() => of(fetchItemsFail({
        error: 'Something went wrong'
      })))
    ))
  ));

  createProduct = createEffect(() => this.actions.pipe(
    ofType(createItemsRequest),
    mergeMap(({itemData}) => this.itemService.createProduct(itemData).pipe(
      map(() => createItemsSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createItemsFail({error: 'Wrong data'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private itemService: ItemService,
    private router: Router
  ) {
  }
}
