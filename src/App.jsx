import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const App = () => {
  const [items, setItems] = useState(Array.from({ length: 10 }));
  const [hasMore, setHasMore] = useState(true);
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false);

  const fetchMoreData = () => {
    if (items.length >= 500) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setItems((previous) => [...previous, ...Array.from({ length: 10 })]);
    }, 1500);
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop > 30) {
      setShowScrollToTopBtn(true);
    } else {
      setShowScrollToTopBtn(false);
    }
  };

  const scrollToTop = () => {
    document.getElementById('scrollableDiv').scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="grid place-content-center h-screen">
      <div className="mockup-phone border-primary">
        <div className="camera"></div>
        <div className="display relative">
          <button
            onClick={scrollToTop}
            className={`btn btn-circle absolute bottom-4 right-4 ${
              !showScrollToTopBtn && 'hidden'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="14"
              width="14"
              viewBox="0 0 512 512"
            >
              <path d="M239 111c9.4-9.4 24.6-9.4 33.9 0L465 303c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-175-175L81 337c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 111z" />
            </svg>
          </button>
          <div
            id="scrollableDiv"
            className="artboard artboard-demo phone-1 pt-[1.75rem] justify-start overflow-y-auto"
            onScroll={handleScroll}
          >
            <InfiniteScroll
              className="space-y-4"
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                <div className="text-center">
                  <span className="loading loading-spinner loading-xs"></span>
                </div>
              }
              endMessage={
                <p className="text-center pb-4">
                  <b>Yay! You have seen it all</b>
                </p>
              }
              scrollableTarget="scrollableDiv"
            >
              {items.map((_, index) => (
                <img
                  src={`https://picsum.photos/id/${index + 10}/200`}
                  key={index}
                />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
