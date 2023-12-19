function CheckBoxHandlerChecked({
  item,
  selectedLists,
  setSelectedLists,
  setSelectedStatus,
  items,
}) {
  const newSelectedLists = new Set(selectedLists);
  const checkedItem = items.findIndex((i) => i === item);

  if (newSelectedLists.has(checkedItem)) {
    newSelectedLists.delete(checkedItem);
  } else {
    newSelectedLists.add(checkedItem);
  }

  const selectedStatus =
    Array.from(newSelectedLists).length > 0 ? "selected_value" : "";
  setSelectedStatus(selectedStatus);

  setSelectedLists(newSelectedLists);

  const selectedContents = Array.from(newSelectedLists).map(
    (index) => items[index]
  );
  const selectedProductId = Array.from(newSelectedLists).map(
    (index) => items[index].productID
  );

  console.log("selectedContents", selectedContents);
  console.log("selectedProductId", selectedProductId);

  return null;
}

export default CheckBoxHandlerChecked;
