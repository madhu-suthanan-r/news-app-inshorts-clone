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
       proxyUrl = '';

      const news = await axios.get(
        `${proxyUrl}https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_APP_API_KEY}&pageSize=${loadMore}&category=${category}`
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
