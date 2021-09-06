import React, { useEffect } from "react"; //, useState
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import { RenderTextarea } from "../Helper";

import { useHistory } from "react-router-dom";

const TaskForm = (props) => {
  const { data, confirmBtnAction, noteId } = props;
  const isData = data ? true : false;
  // Task_title, Description, EndTime, Creator_email, Task_status
  const todayDate = new Date();
  const initialValue = {
    Task_ID: isData ? data.Task_ID : "",
    Task_title: isData ? data.Task_title : "",
    Description: isData ? data.Description : "",
    EndTime: isData ? new Date(data.EndTime) : todayDate,
    Recv_email: isData ? data.Recv_email : "",
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // "onChange"
  });
  let history = useHistory();

  function UpdateTaskNote(params) {
    console.log(params);
    const postURL = `http://localhost:5000/notes/updateTaskNotes`;
    axios
      .post(postURL, params)
      .then(({ data }) => {
        if (data.status === 200) {
          history.push("/tasks-management");
          confirmBtnAction();
        } else {
          // setErrMsg(data.msg);
          // setShow(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function CreateTask(params) {
    const postURL = `http://localhost:5000/task/user/add_task`;
    axios
      .post(postURL, params)
      .then(({ data }) => {
        if (data.status === 200) {
          if (noteId !== null) {
            UpdateTaskNote({
              note_id: params["noteId"],
              task_id: data.task_ID,
              User_email: localStorage.getItem("email"),
              task_title: params["Task_title"],
            });
          } else {
            confirmBtnAction();
          }
        } else {
          // setErrMsg(data.msg);
          // setShow(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function EditTask(params) {
    const postURL = `http://localhost:5000/task/user/edit_task`;
    axios
      .post(postURL, params)
      .then(({ data }) => {
        if (data.status === 200) {
          confirmBtnAction();
        } else {
          // setErrMsg(data.msg);
          // setShow(true);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {}, []);

  const onSubmit = (paramData, e) => {
    e.preventDefault();
    paramData["Creator_email"] = localStorage.getItem("email");
    paramData["Task_status"] = 0;
    e.preventDefault();
    if (isData) {
      paramData["Recv_email"] = data["Recv_email"];
      paramData["Task_ID"] = data["Task_ID"];
      EditTask(paramData);
    } else {
      paramData["noteId"] = noteId;
      CreateTask(paramData);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 form-group">
          <label htmlFor="Task_title" className="form-label">
            Task Title
          </label>
          <input
            name="Task_title"
            type="text"
            className="form-control"
            autoComplete="on"
            defaultValue={initialValue.Task_title}
            {...register("Task_title", {
              required: "Task Task_title cannot be empty.",
            })}
          />
          {errors.Task_title && (
            <p className="error-msg">{errors.Task_title.message}</p>
          )}
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <Controller
            name="Description"
            control={control}
            row={5}
            rules={{ required: true }}
            defaultValue={initialValue.Description}
            render={({ field }) => <RenderTextarea {...field} />}
          />
          {errors.description && (
            <p className="error-msg">This field is required.</p>
          )}
          <label htmlFor="EndTime" className="form-label">
            Deadline
          </label>
          <Controller
            name="EndTime"
            control={control}
            defaultValue={todayDate}
            render={({ field }) => (
              <DateTimePicker
                onChange={(e) => field.onChange(e)}
                value={field.value ? field.value : todayDate}
                minDate={todayDate}
                format="dd-MM-y h:mm a"
                disableClock={true}
                closeWidgets={false}
                className="meeting-datetime-picker"
                required
              />
            )}
            rules={{ required: true }}
          />
          {errors.deadline && (
            <p className="error-msg">This field is required.</p>
          )}
          <label htmlFor="Recv_email" className="form-label">
            Participants
          </label>
          <Controller
            name="Recv_email"
            control={control}
            row={5}
            defaultValue={initialValue.Recv_email}
            rules={{ required: true }}
            render={({ field }) => <RenderTextarea {...field} />}
          />
          <small>*Note: seperate multiple email addresses with new line.</small>
        </div>

        <input
          type="submit"
          className="btn-block btn btn-primary"
          value={isData ? "Edit" : "Add"}
        />
      </form>
    </>
  );
};

export default TaskForm;
