import { useState } from 'react';

const PostBox = ({ text, user, id, deletePost, editPost }) => {
  const [editMode, setEditMode] = useState(false);
  const [edit, setEdit] = useState(text);

  const handleSubmit = (e) => {
    e.preventDefault();
    editPost(user, id, edit);
    setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 my-8 shadow-md card">
      {!editMode ? (
        <h3 className="text-lg">{text}</h3>
      ) : (
        <input className="p-4 bg-primary bg-opacity-25 rounded-md" type="textarea" value={edit} onChange={(e) => setEdit(e.target.value)} />
      )}
      <div className="flex">
        {editPost && !editMode && (
          <button
            className="mx-auto mt-8 w-1/4 btn btn-primary"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
        {editPost && editMode && (
          <button type="submit" className="mx-auto mt-8 w-1/4 btn btn-primary">
            Save
          </button>
        )}
        {deletePost && (
          <button
            className="mx-auto mt-8 w-1/4 btn btn-secondary"
            onClick={deletePost}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default PostBox;
