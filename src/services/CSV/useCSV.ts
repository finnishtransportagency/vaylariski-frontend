import { useState } from 'react';

export type CSVElement = {} | undefined;

export function useCSV<T>() {
  const [csvData, setCsvData] = useState<CSVElement[][]>([]);

  function selectCsvData(rows: T[]) {
    // TODO!

    // const headers: string[] = toHeader(Object.keys(results[0])[0]);

    // const [columns, setVisibleData] = useState<
    //   (SelectedColumn & {
    //     header: string;
    //     width: number;
    //     resizable: boolean;
    //     sortable: boolean;
    //   })[]
    // >([]);

    // Create data constant to export table as csv
    // const data = [
    //   columns.map((column) => column.header), // Add headers as first row
    //   ...displayRowResults.map((row) =>
    //     columns.reduce((acc, column) => {
    //       acc[column.key] = row[column.key];
    //       return acc;
    //     }, {})
    //   ),
    // ];

    const data = [[]];

    // Formatting dataset before exporting
    const csvData = data.map((row) => Object.values(row).map(toCsvElement));

    setCsvData(csvData);
  }

  function toCsvElement(value: unknown): CSVElement {
    if (typeof value === 'number') {
      // changing points to commas for excel
      return value.toString().replace(/\./g, ',');
    }
    if (value === null) {
      // empty cells to nan because of excel
      return (value = 'nan');
    }
    return value;
  }

  return { csvData, selectCsvData };
}
