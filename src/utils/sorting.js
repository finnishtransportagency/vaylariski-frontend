export const sortTableStringOfNumbersWithInf = (sortedRows, columnKey) => {
  return sortedRows.sort((a, b) => {
    const a1 =
      a[columnKey] === "inf" ? Number.MAX_SAFE_INTEGER : Number(a[columnKey]);
    const b1 =
      b[columnKey] === "inf" ? Number.MAX_SAFE_INTEGER : Number(b[columnKey]);
    return a1 - b1;
  });
};

export const sortRIVpointsByRadius = (RIVResult) => {
  RIVResult?.features.sort((a, b) => {
    if (a.properties.bend_radius && !b.properties.bend_radius) {
      return 1;
    } else if (!a.properties.bend_radius && b.properties.bend_radius) {
      return -1;
    } else {
      return 0;
    }
  });
  return RIVResult;
};
