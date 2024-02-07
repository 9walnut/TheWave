function CheckBoxHandlerDelete({ selectedLists, items, setItems }) {
  const selectedIndexes = Array.from(selectedLists);
  const updatedItems = items.filter(
    (_, index) => !selectedIndexes.includes(index)
  );
  const deletedItems = selectedIndexes.map((index) => items[index]);
  setItems(updatedItems);

  return null;
}

export default CheckBoxHandlerDelete;
