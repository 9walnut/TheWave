function CheckBoxHandlerSelectAll({ selectedLists, items, setSelectedLists }) {
  const selectedAll = selectedLists.size === items.length;
  const newSelectedLists = new Set(
    selectedAll ? [] : items.map((_, index) => index)
  );
  setSelectedLists(newSelectedLists);

  const selectedAllContents = Array.from(newSelectedLists).map(
    (index) => items[index]
  );

  console.log("selectedAllContents", selectedAllContents);

  return null;
}

export default CheckBoxHandlerSelectAll;
