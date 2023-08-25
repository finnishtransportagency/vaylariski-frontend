export const sortTableStringOfNumbersWithInf = (sortedRows, columnKey) => {
  return sortedRows.sort((a, b) => {
    const a1 =
      a[columnKey] === "inf" ? Number.MAX_SAFE_INTEGER : Number(a[columnKey]);
    const b1 =
      b[columnKey] === "inf" ? Number.MAX_SAFE_INTEGER : Number(b[columnKey]);
    return a1 - b1;
  });
};
