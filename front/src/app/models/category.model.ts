export class CategoryModel {
  constructor(
    public id: string,
    public title: string
  ) {
  }
}

export interface ApiCategoryData {
  _id: string,
  title: string
}
