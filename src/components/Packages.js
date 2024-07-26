import React, { useEffect, useState } from "react";

const Packages = () => {
  const [details, setDetails] = useState([]);
  const [typeOtions, setTypeOtions] = useState([]);
  const [condition, setCondition] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [place, setPlace] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;
  const fetchTypeOptions = async () => {
    let url = `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats`;
    const response = await fetch(url);
    const data = await response.json();
    setTypeOtions(data);
  };

  const fetchData = async () => {
    let url;
    if (date) {
      url = `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?date=${date}&page=${page}&limit=${limit}`;
    } else if (condition) {
      url = `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?filter=${condition}&page=${page}&limit=${limit}`;
    } else if (search) {
      url = `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?search=${search}&page=${page}&limit=${limit}`;
    } else if (place) {
      url = `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?location=${place}&page=${page}&limit=${limit}`;
    } else {
      url = `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=${page}&limit=${limit}`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("API response is not an array");
      }

      setDetails(data);
      setHasMore(data.length === limit);
    } catch (error) {
      console.error("Fetch error: ", error);
      setDetails([]);
      setHasMore(false);
    }
  };

  const handleDate = (date) => {
    if (date === "All") {
      setDate("");
    } else {
      setDate(date);
    }
  };

  const handleType = (type) => {
    if (type === "All") {
      setCondition("");
    } else {
      setCondition(type);
    }
  };
  const handlePlace = (place) => {
    if (place === "All") {
      setPlace("");
    } else {
      setPlace(place);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchData();
  }, [date, condition, place, search, page]);

  useEffect(() => {
    fetchTypeOptions();
  }, []);

  return (
    <div>
      <div className="filter-pack">
        <div className="filter-select">
          <select name="date" onChange={(e) => handleDate(e.target.value)}>
            <option disabled selected>
              Sort by Date
            </option>
            <option>All</option>
            {typeOtions?.map((item) => {
              return <option key={item.id}>{item.date}</option>;
            })}
          </select>

          <select onChange={(e) => handleType(e.target.value)} name="type">
            <option disabled selected>
              Sort by Type
            </option>
            <option>All</option>
            {typeOtions?.map((item) => {
              return <option key={item.id}>{item.condition}</option>;
            })}
          </select>
          <select onChange={(e) => handlePlace(e.target.value)} name="place">
            <option disabled selected>
              Sort by Place
            </option>
            <option>All</option>
            {typeOtions?.map((item) => {
              return <option key={item.id}>{item.location}</option>;
            })}
          </select>
        </div>
        <input
          className="filter-input"
          placeholder="Search retreats by title"
          onChange={(e) => handleSearch(e.target.value)}
        ></input>
      </div>
      <div className="pack-card_container">
        {details.length > 0 ? (
          details.map((item) => {
            return (
              <div className="pack-card-w" key={item?.id}>
                <div className="pack-card">
                  <div
                    className="pack-img"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <h6>{item.title}</h6>
                  <p>{item.description}</p>
                  <p>Date: {item.date}</p>
                  <p>Location: {item.location}</p>
                  <p>Price: ${item.price}</p>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="empty-data">Course Unavailable</h1>
        )}
      </div>
      <div className="pack-btns">
        <button onClick={previousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={!hasMore}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Packages;
