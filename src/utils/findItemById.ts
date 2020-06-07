interface Item {
  id: string;
}

const findItemById = <ItemType extends Item>(
  id: string,
  items: ItemType[],
): ItemType | undefined => (
    items.find(product => product?.id === id)
  );

export default findItemById;
