import EachPrice from '../interfaces/EachPrice';
import StockData from '../interfaces/StockData';

export const getLabels = (data: EachPrice[]): string[] => {
  const keysArray: string[] = data.reduce((acc: string[], obj: EachPrice) => {
    const key = Object.keys(obj)[0];
    acc.push(key);
    return acc;
  }, []);
  return keysArray;
}

export const dataSet = (data: EachPrice[]): number[] =>  {
  const numericValues: number[] = data.reduce((acc: number[], obj: EachPrice) => {
    const value = Object.values(obj)[0];
    acc.push(value);
    return acc;
  }, []);
  return numericValues;
}

export const downloadCsv = (apiResponse: StockData[]) => {
  const csvData: string[][] = [];
  let dates: string[] = [];

  if (apiResponse.length > 0) {
    dates = apiResponse[0].prices.map(priceObj => Object.keys(priceObj)[0]);
  }
  const headerRow: string[] = ['Name', ...dates];
  csvData.push(headerRow);

  apiResponse.forEach((symbolData: StockData) => {
    const rowData: string[] = [symbolData.name];
    dates.forEach((date: string) => {
      const matchingPrice = symbolData.prices.find(priceObj => Object.keys(priceObj)[0] === date);
      rowData.push(matchingPrice ? String(Object.values(matchingPrice)[0]) : '');
    });
    csvData.push(rowData);
  });

  const csvContent: string = csvData.map(row => row.join(',')).join('\n');

  const blob: Blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url: string = URL.createObjectURL(blob);
  const link: HTMLAnchorElement = document.createElement('a');
  link.href = url;
  link.download = 'data.csv';
  link.click();
  URL.revokeObjectURL(url);
}
