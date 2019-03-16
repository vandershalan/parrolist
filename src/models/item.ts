export class Item {

    public id: string;
    public active = true;
    public listRef: string;
    public categoryId: string;

    constructor(public name: string, public description: string = null, public type: ItemType = ItemType.Item) {
    }
}


export enum ItemType {
    Item = 'item',
    List = 'list'
}
