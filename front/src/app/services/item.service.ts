import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {ApiItemData, Item, ItemData} from "../models/item.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<ApiItemData[]>(environment.apiUrl + '/items').pipe(
      map(response => {
        return response.map(itemData => {
          return new Item(
            itemData._id,
            itemData.category,
            itemData.title,
            itemData.price,
            itemData.description,
            itemData.user,
            itemData.image,
          );
        });
      })
    );
  }
  getItem(id: string | null) {
    return this.http.get<ApiItemData[]>(environment.apiUrl + '/items/' + id).pipe(
      map(response => {
        return response.map(itemData => {
          return new Item(
            itemData._id,
            itemData.category,
            itemData.title,
            itemData.price,
            itemData.description,
            itemData.user,
            itemData.image,
          );
        });
      })
    );
  }

  createProduct(itemData: ItemData) {
    const formData = new FormData();

    Object.keys(itemData).forEach(key => {
      if (itemData[key] !== null) {
        formData.append(key, itemData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/items', formData);
  }
}
