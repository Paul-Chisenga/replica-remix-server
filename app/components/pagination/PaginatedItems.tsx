import { Link } from "@remix-run/react";
import type { FC } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import shopCarddata from "~/data/shopCard_dara.json";

// Example items, to simulate fetching from another resources.
const items = shopCarddata;

const Items: FC<{ currentItems: any[] }> = ({ currentItems }) => {
  return (
    <>
      {currentItems.map((item) => (
        <div className="col-md-6 col-sm-6" key={item.id}>
          <div className="food-items2-wrap">
            <div className="food-img">
              <img
                className="img-fluid"
                src={item.image}
                alt="h2-food-item-1"
              />
              <div className="cart-icon">
                <Link to="/cart">
                  <i className="bi bi-cart-plus" />
                </Link>
              </div>
              <div className="pric-tag">
                <span>${item.price}</span>
              </div>
            </div>
            <div className="food-content">
              <ul className="d-flex align-items-center justify-content-center p-0 gap-1">
                <li>
                  <i className="bi bi-star-fill" />
                </li>
                <li>
                  <i className="bi bi-star-fill" />
                </li>
                <li>
                  <i className="bi bi-star-fill" />
                </li>
                <li>
                  <i className="bi bi-star-fill" />
                </li>
                <li>
                  <i className="bi bi-star-fill" />
                </li>
              </ul>
              <h3>
                <Link to="/shop/id">{item.title}</Link>
              </h3>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const PaginatedItems: FC<{ itemsPerPage: number }> = ({ itemsPerPage }) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<i className="bi bi-arrow-right" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel={<i className="bi bi-arrow-left" />}
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
};

export default PaginatedItems;
