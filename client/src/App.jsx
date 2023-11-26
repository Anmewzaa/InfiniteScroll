import axios from "axios";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const App = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://api.sampleapis.com/codingresources/codingResources"
    );
    if (response.data.length > 4) {
      setData([...setData, ...response.data]);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[960px]">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<div>Loading...</div>}
        >
          <div className="grid grid-cols-4 gap-4">
            {data.map((item) => (
              <div key={item.id} className="card bg-base-100 shadow-xl">
                <div className="card-body flex flex-col justify-between">
                  <h2 className="card-title">{item.description}</h2>
                  <a href={item.url} className="btn btn-neutral">
                    Visit website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default App;
