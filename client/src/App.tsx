import { useEffect, useState } from 'react';
import StockData from './interfaces/StockData'; 
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import Navbar from './components/Navbar';
import Buttons from './components/Buttons';
import axios, { AxiosResponse } from 'axios'; 
import { downloadCsv } from './helper/helper';

function App() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response: AxiosResponse<StockData[]> = await axios.get('http://localhost:5000/get');
      setStocks(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  } 

  const toggleChartType = () => {
    setChartType(chartType === 'line' ? 'bar' : 'line');
  };

  const refresh =  async ()=>{
    try {
      await axios.get('http://localhost:5000/update');
      fetchData();
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  const handleDownload = async () => {
    try {
      downloadCsv(stocks);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  
  return (
    <>
      <Navbar/>
      <div className='container'>
        <div className="buttonGrp">
          {stocks.length !== 0 && <Buttons func={toggleChartType} value={"Toggle Chart Type"}/>}
          <Buttons func={refresh} value={"Refresh Data"}/>
          {stocks.length !==0 && <Buttons func={handleDownload} value={"Download CSV"}/>}
        </div>
        {stocks.map((stock) => (
          <div key={stock.symbol} className='content'>
            <h2>{stock.name}</h2>
            {chartType === 'line' ? (
              <LineChart prices={stock.prices}/>
            ) : (
              <BarChart prices={stock.prices} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;


