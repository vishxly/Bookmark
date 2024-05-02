import React, { useEffect, useState } from "react";
import BookmarkForm from "./BookmarkForm/BookmarkForm";
import BookmarkList from "./BookmarkList/BookmarkList";
import "./Bookmarks.css";

const Bookmarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<
    { id: string; bmTitle: string; bmLink: string }[]
  >([]);
  const [showForm, setShowForm] = useState(false);

  const addBookmark = (bookmark: {
    id: string;
    bmTitle: string;
    bmLink: string;
  }) => {
    setBookmarks((prevBookmarks) => [
      ...prevBookmarks,
      {
        id: bookmark.id,
        bmTitle: bookmark.bmTitle,
        bmLink: bookmark.bmLink,
      },
    ]);
    setShowForm(false);
  };

  const deleteBookmark = (id: string) => {
    setBookmarks((prevBookmarks) => prevBookmarks.filter((bm) => bm.id !== id));
    console.log(id);
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    const json = localStorage.getItem("bookmarks");
    const loadedBookmarks = JSON.parse(json || "[]");
    if (loadedBookmarks.length > 0) {
      setBookmarks(loadedBookmarks);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(bookmarks);
    localStorage.setItem("bookmarks", json);
    console.log("Bookmarks stored in local storage:", bookmarks);
  }, [bookmarks]);
  return (
    <div className="bookmarks ">
      <div className="bookmarks-container">
        {showForm && (
          <div className="backdrop">
            <BookmarkForm addBookmark={addBookmark} closeForm={closeForm} />
          </div>
        )}
        <BookmarkList
          bookmarks={bookmarks}
          deleteBookmark={deleteBookmark}
          openForm={openForm}
        />
        <div className="button-container my-1">
          <button
            onClick={clearBookmarks}
            className="ext-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
