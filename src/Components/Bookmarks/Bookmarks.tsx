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
    // console.log(id);
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
    // console.log("Bookmarks stored in local storage:", bookmarks);
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
          clearBookmarks={clearBookmarks} // Pass clearBookmarks as a prop
        />
        <div className="button-container my-1">
          
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
