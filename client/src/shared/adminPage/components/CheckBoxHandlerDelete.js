function CheckBoxHandlerDelete({ selectedLists, items, setItems }) {
  const selectedIndexes = Array.from(selectedLists);
  const updatedItems = items.filter(
    (_, index) => !selectedIndexes.includes(index)
  );
  const deletedItems = selectedIndexes.map((index) => items[index]);
  setItems(updatedItems);

  console.log("삭제 전 배열", items);
  console.log("뭐가 삭제될거니", deletedItems);
  console.log("삭제 후 배열", updatedItems);

  return null;
}

export default CheckBoxHandlerDelete;
