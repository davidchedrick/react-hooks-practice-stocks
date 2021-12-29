import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [filter, setFilter] = useState("Tech");
  const [sortBy, setSortBy] = useState("Alphabetically")
  console.log("sortBy: ", sortBy);
  console.log("filter: ", filter);
  console.log("portfolio: ", portfolio);
  console.log("stocks: ", stocks);

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
    .then(resp => resp.json())
    .then(setStocks)
  }, [])

  function handleAddStock(stockToAdd) {
    const stockInPort = portfolio.find(
      stock => stock.id === stockToAdd.id
    );
    if(!stockInPort) {
      setPortfolio([...portfolio, stockToAdd])
    }
  }

  function handleRemoveStock(stockToRemove) {
    setPortfolio(portfolio => 
      portfolio.filter(stock => stock.id !== stockToRemove.id)
    );
  }

  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if(sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  });

  const filteredStocks = sortedStocks.filter(
    stock => stock.type === filter
  );

  return (
    <div>
      <SearchBar 
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filter}
        onChangeFilter={setFilter}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer 
            stocks={filteredStocks} 
            onStockClick={handleAddStock}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer 
            stocks={portfolio}
            onRemoveStock={handleRemoveStock}
          />
        </div>
      </div>
    </div>
  );

}

export default MainContainer;
