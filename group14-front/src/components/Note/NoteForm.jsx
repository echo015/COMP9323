import React from "react";
import { useForm, Controller } from "react-hook-form";
import { RenderTextarea } from "../../components/Helper";
import axios from "axios";

const NoteForm = ({ meetingId, submitNoteAction }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // "onChange"
  });
  const postURL = "http://localhost:5000/notes/addNotes";
  const userEmail = localStorage.getItem("userEmail");
  const onSubmit = (submitData, e) => {
    e.preventDefault();
    const param = {
      ...submitData,
      User_email: userEmail,
      meeting_id: meetingId,
    };
    axios
      .post(`${postURL}`, param)
      .then(({ data }) => {
        if (data.status === 200) {
          submitNoteAction(meetingId);
        } else {
          console.log("fail", data);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 form-group">
          <Controller
            name="notes"
            control={control}
            row={5}
            rules={{ required: true }}
            render={({ field }) => <RenderTextarea {...field} />}
          />
          {errors.notes && <p className="error-msg">This field is required.</p>}
        </div>
        <input
          type="submit"
          value="Add Note"
          className="btn-block btn btn-primary"
        />
      </form>
    </>
  );
};

export default NoteForm;
