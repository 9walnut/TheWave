function CheckBoxHandlerChecked({
  item,
  selectedLists,
  setSelectedLists,
  setSelectedStatus,
  items,
  onSelectionChange,
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

  selectedContents.forEach((content) => {
    if (content.hasOwnProperty("userNumber")) {
      console.log("userNumber", content.userNumber);
    }
  });

  const selectedProductId = Array.from(newSelectedLists).map(
    (index) => items[index].productID
  );
  const selectedUserNumber = Array.from(newSelectedLists).map(
    (index) => items[index].userNumber
  );

  console.log("selectedContents", selectedContents);
  console.log("selectedProductId", selectedProductId);
  console.log("selectedUserNumber", selectedUserNumber);

  onSelectionChange({
    selectedProductId,
    selectedUserNumber,
  });

  return null;
}

export default CheckBoxHandlerChecked;
