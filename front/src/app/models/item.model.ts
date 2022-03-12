export class Item {
  constructor(
    public id: string,
    public category: string,
    public title: string,
    public price: number,
    public description: string,
    public user: string,
    public image: string,

  ) {}
}

export interface ItemData {
  [key: string]: any;
  category: string,
  title: string;
  price: number;
  description: string;
  user: string,
  image: File | null;

}

export interface ApiItemData {
  _id: string,
  category: string,
  title: string,
  price: number,
  description: string,
  user: string,
  image: string
}
