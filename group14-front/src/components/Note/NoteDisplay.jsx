import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./NoteForm";
import { isEmptyObj } from "../Helper";
import ErrorHandling from "../ErrorHandling";
import { Link } from "react-router-dom";

const NoteDisplay = ({ meetingId }) => {
  const apiURL = "http://localhost:5000/notes";
  const [state, setState] = useState({
    data: [],
    loading: true,
    err: "",
  });
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const isMentor = userRole === "mentor" ? true : false;
  async function fetchNoteData(meetingId) {
    try {
      const res = await axios.get(`${apiURL}/getNotes`, {
        params: { meeting_id: meetingId },
      });
      const { data } = res;
      setState((state) => ({
        ...state,
        data: data.data,
        loading: false,
      }));
    } catch (err) {
      setState({ loading: false, err: err.response });
    }
  }

  useEffect(() => {
    fetchNoteData(meetingId);
    return () => setState({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingId]);

  const fetchNote = (meetingId) => {
    fetchNoteData(meetingId);
  };

  const deleteNoteTask = (task_id) => {
    axios
      .delete(`http://localhost:5000/task/user/delete_task`, {
        params: {
          Task_ID: task_id,
        },
      })
      .then(({ data }) => {
        if (data.status === 200) {
          fetchNoteData(meetingId);
        } else {
          alert(`Delete note fail: ${data.msg}`);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteNote = (noteId) => {
    axios
      .post(`${apiURL}/deleteNotes`, {
        Note_ID: noteId,
      })
      .then(({ data }) => {
        if (data.status === 200) {
          // fetchNoteData(meetingId);
          deleteNoteTask(data.task_ID);
        } else {
          alert(`Delete note fail: ${data.msg}`);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {!state.loading && state.err && <ErrorHandling errMsg={state.err} />}
      {!state.loading &&
        !isEmptyObj(state.data) &&
        state.data.map((note) => (
          <div className="note-card" key={note.noteId}>
            <p>
              <strong>User: </strong> {note.user_id}
            </p>
            <p>
              <strong>Content: </strong>
              {note.content}
            </p>
            <div className="note-action-group">
              {isMentor && !note.taskId && (
                <Link
                  to={`/tasks-management?noteId=${note.noteId}&meetingId=${meetingId}`}
                >
                  Add Task
                </Link>
              )}
              {note.taskId !== null && (
                <Link to={`/tasks-management/${note.taskId}`}>View Task</Link>
              )}
              {userEmail === note.user_id && (
                <button
                  className="note-anchor-link"
                  onClick={() => deleteNote(note.noteId)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      <NoteForm meetingId={meetingId} submitNoteAction={fetchNote} />
    </>
  );
};

export default NoteDisplay;
