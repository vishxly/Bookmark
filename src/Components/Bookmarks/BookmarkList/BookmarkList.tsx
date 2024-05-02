import React from "react";
import Bookmark from "../Bookmark/Bookmark";
import "./BookmarkList.css";

interface BookmarkListProps {
  bookmarks: {
    id: string;
    bmLink: string;
    bmTitle: string;
  }[];
  deleteBookmark: (id: string) => void;
  openForm: () => void;
}

const BookmarkList: React.FC<BookmarkListProps> = ({
  bookmarks,
  deleteBookmark,
  openForm,
}) => {
  return (
    <section className="bookmark-list bg-gradient-to-r from-slate-500 to-yellow-100">
      <header>
        <h3>Bookmarks</h3>
        <button
          className="btn-control btn-add lign-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
          type="button"
          onClick={openForm}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            ></path>
          </svg>
          Add New +
        </button>
      </header>
      <div className="bms-container">
        <ul className="bms-list">
          {bookmarks.map((bm) => (
            <Bookmark key={bm.id} bm={bm} deleteBookmark={deleteBookmark} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BookmarkList;
