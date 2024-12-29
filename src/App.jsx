import { useEffect, useState } from "react";
import "./App.css";
import NavInshorts from "./components/NavInshorts";
import axios from "axios";
import NewsContent from "./components/NewsContent/NewsContent";
import Footer from "./components/Footer/Footer";

function App() {
  const [category, setCategory] = useState("general");
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);
  const [newsArray, setNewsArray] = useState([]);

  const newsApi = async () => {
    try {
      let proxyUrl = "https://cors-anywhere.herokuapp.com/";
      //  proxyUrl = '';

      const news = await axios.get(
        `${proxyUrl}https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_APP_API_KEY}&pageSize=${loadMore}&category=${category}`, {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
            'Host': 'cors-anywhere.herokuapp.com',
            'Origin': 'http://localhost:5173',
            'Referer': 'http://localhost:5173/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
            'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          }
        }
      );
      console.log(news);
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newsApi();
    // eslint-disable-next-line
  }, [newsResults, loadMore, category]);

  return (
    <>
      <div className="App" id="home">
        <NavInshorts setCategory={setCategory} />
        {newsResults && (
          <NewsContent
            newsArray={newsArray}
            newsResults={newsResults}
            loadMore={loadMore}
            setLoadMore={setLoadMore}
          />
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
