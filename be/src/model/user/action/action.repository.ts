import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionRepository {
  private dataStore = {
    watchList: [],
    favoriteList: [],
    rating: [],
  };

  findAll(type: string) {
    return this.dataStore[type];
  }

  create(type: string, item: any) {
    const id = Date.now().toString();
    const newItem = { id, ...item };
    this.dataStore[type].push(newItem);
    return newItem;
  }

  delete(type: string, id: string) {
    const index = this.dataStore[type].findIndex((item) => item.id === id);
    if (index === -1) {
      return { error: 'Item not found' };
    }
    const deletedItem = this.dataStore[type].splice(index, 1);
    return deletedItem[0];
  }
}
