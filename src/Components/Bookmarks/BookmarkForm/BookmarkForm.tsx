// BookmarkForm.tsx
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './BookmarkForm.css';
import { AiFillCloseCircle } from 'react-icons/ai';

interface BookmarkFormProps {
  addBookmark: (bookmark: { id: string; bmTitle: string; bmLink: string }) => void;
  closeForm: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
const BookmarkForm: React.FC<BookmarkFormProps> = (props) => {
  const [bmTitle, setBmTitle] = useState('');
  const [bmLink, setBmLink] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleRef.current) {
      props.addBookmark({ id: uuidv4(), bmTitle: bmTitle, bmLink: bmLink });
    }
  }

  const closeFormHandler = () => {
    props.closeForm();
  }

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [])

  return (
    <section className="bookmark-form ">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="bmTitle">Title</label>
            <input
              id="bmTitle"
              type="text"
              onChange={e => setBmTitle(e.target.value)}
              ref={titleRef}
            />
          </div>
          <div className="form-control">
            <label htmlFor="bmLink">URL</label>
            <input
              id="bmLink"
              type="text"
              onChange={e => setBmLink(e.target.value)}
            />
          </div>
          <button className="btn-cancel" onClick={closeFormHandler}>Cancel</button>
          <button className="btn-add" type="submit">Add Bookmark</button>
        </form>
        <button className="btn-close" onClick={closeFormHandler}><AiFillCloseCircle /></button>
      </div>
    </section>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(BookmarkForm);
