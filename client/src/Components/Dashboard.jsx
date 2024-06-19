import React, { useState, useEffect, useContext, useRef } from 'react';
import noteContext from '../context/noteContext';
import { useNavigate } from 'react-router-dom';
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function Dashboard() {
  const context = useContext(noteContext);
  const { getAllNotes, notes, addNote, deleteNote, editNote } = context;

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllNotes();
    } else {
      navigate('/login');
    }
  }, []);

  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  const [updatedNote, setUpdatedNote] = useState({ id: '', title: '', description: '', tag: '' });
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReadMoreModalOpen, setIsReadMoreModalOpen] = useState(false);
  const refClose = useRef(null);

  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({ title: '', description: '', tag: '' });
    getAllNotes();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    deleteNote(id);
    getAllNotes(); // Assuming getAllNotes fetches fresh data after delete
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openReadMoreModal = (note) => {
    setSelectedNote(note);
    setIsReadMoreModalOpen(true);
  };

  const closeReadMoreModal = () => {
    setIsReadMoreModalOpen(false);
  };

  const updateNote = (currentNote) => {
   
    openModal();
    setUpdatedNote({
      id: currentNote.id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
  };

  const handleClickUpdate = (e) => {
    e.preventDefault();
    editNote(updatedNote);
    closeModal();
    
    getAllNotes(); // Assuming getAllNotes fetches fresh data after edit
  };

  const onChangeUpdate = (e) => {
    setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value });

  };

  const handleCheckboxChange = async (note) => {
    const updatedDescription = note.description === 'done' ? 'pending' : 'done';
    await editNote({ ...note, description: updatedDescription });

    // Assuming getAllNotes() fetches fresh data including the updated note
    getAllNotes();
  };

  const truncateText = (text, length = 20) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '... ';
  };

  return (
    <div className="flex h-screen bg-primary-900 text-base-content">
      <main className="flex-1 p-2 md:p-8 bg-primary-900 texxt-base-content">
        <div className="mb-6 flex row justify-center align-middle justify-items-center items-center">
          <input
            className="w-full mb-2 p-2 rounded-md border border-gray-700 bg-primary-800 texxt-base-content"
            placeholder="Enter tasks"
            name="title"
            value={note.title}
            onChange={onChange}
            type="text"
          />
          <button className="btn-sm md:btn-md bg-accent-content hover: text-white mx-1  md:mx-2 px-3 py-1 rounded-md" onClick={handleAddNote}>
            <pre>Add Task</pre>
          </button>
        </div>

        {/* Modal for editing a note */}
        <button className="btn hidden" onClick={openModal}>
          Open Modal
        </button>
        {isModalOpen && (
          <dialog id="my_modal_1" className="modal" open ref={refClose}>
            <div className="modal-box">
              <div className="">
                <form onSubmit={handleClickUpdate} className='flex flex-col align-center justify-center align-center items-center'>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                      Title:
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="block w-full rounded-lg border p-2.5 text-sm text-white bg-base-200 focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Enter title"
                      value={updatedNote.title}
                      onChange={onChangeUpdate}
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <button type="submit" className="btn bg-secondary-content hover:bg-primary-600 text-white mr-2">
                      Save
                    </button>
                    <button type="button" className="btn bg-red-500 hover:bg-red-600 text-white" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        )}

        {/* Modal for reading more */}
        {isReadMoreModalOpen && selectedNote && (
          <dialog id="read_more_modal" className="modal" open>
            <div className="modal-box">
              <h3 className="text-lg font-bold">Full Title</h3>
              <p className="py-4">{selectedNote.title}</p>
              <div className="modal-action">
                <button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={closeReadMoreModal}>
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}

        <div className="space-y-4">
          {notes.map((note, index) => (
            <div key={index} className="border border-gray-700 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <div className='flex row align-center justify-center items-center'>
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 mr-2"
                    checked={note.description === 'done'}
                    onChange={() => handleCheckboxChange(note)}
                  />
                  <span className="break-words">
                    <span className="block md:hidden">
                      {truncateText(note.title, 12)}
                      {note.title.length > 12 && (
                        <button
                          className="text-blue-500"
                          onClick={() => openReadMoreModal(note)}
                        >
                          Read more
                        </button>
                      )}
                    </span>
                    <span className="hidden md:block">
                      {note.title}
                    </span>
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 md:p-3 bg-gray-500 text-white px-2 py-1 rounded-md"
                    onClick={() => updateNote(note)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="p-2 md:p-3 max-h-16 bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => handleDelete(note.id)}
                  >
                    <AiTwotoneDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
