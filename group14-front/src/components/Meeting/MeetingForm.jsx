import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
import { RenderTextarea } from "../../components/Helper";
import axios from "axios";

const MeetingForm = ({ data, confirmBtnAction }) => {
  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");
  const isMentor = userRole === "mentor" ? true : false;
  const todayDate = new Date();
  const isData = data ? true : false;
  const postURL = `http://localhost:5000/meeting/user/`;
  const postPath = isData ? "edit_meeting" : "add_meeting";
  const [checkVal, setCheckVal] = useState(false);
  const initialValue = {
    title: isData ? data.topic : "",
    agenda: isData ? data.agenda : "",
    date: isData ? new Date(data.start_time) : todayDate,
    duration: isData ? data.duration : "",
    recurring: isData ? true : false,
    recurringWeek: isData ? data.numberOfWeek : 1,
    mentor: isData ? data.mentor : "",
    attendees: isData ? data.attendees : "",
  };
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // "onChange"
  });
  const recurring = watch("recurring");
  const onSubmit = (submitData, e) => {
    e.preventDefault();
    const isRecurring = submitData.recurring;
    const param = {
      ...submitData,
      id: isData ? data.id : null,
      attendees: isMentor
        ? submitData.attendees
        : `${submitData.attendees}\n${userEmail}`,
      user_id: isMentor ? userEmail : submitData.mentor,
      type: isRecurring ? 8 : 2,
      recurrence: isRecurring
        ? {
            type: 2,
            end_times: submitData.numberOfWeek,
            weekly_days: submitData.start_time.getDay() + 1,
          }
        : null,
      settings: {
        auto_recording: "cloud",
      },
    };
    axios
      .post(`${postURL}${postPath}`, param)
      .then(({ data }) => {
        if (data.status === 200) {
          confirmBtnAction();
        } else {
          alert(`Add meeting failed: ${data.msg}`);
        }
      })
      .catch((err) => {
        alert(`ERROR ${err.response.status}: ${err.response.statusText}`);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 form-group">
          <label htmlFor="topic" className="form-label">
            Meeting Title*
          </label>
          <input
            name="topic"
            type="text"
            className="form-control"
            autoComplete="on"
            defaultValue={initialValue.title}
            {...register("topic", {
              required: "Meeting title cannot be empty.",
            })}
          />
          {errors.topic && <p className="error-msg">{errors.topic.message}</p>}
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="agenda" className="form-label">
            Agenda*
          </label>
          <Controller
            name="agenda"
            control={control}
            row={5}
            defaultValue={initialValue.agenda}
            rules={{ required: true }}
            render={({ field }) => <RenderTextarea {...field} />}
          />
          {errors.agenda && (
            <p className="error-msg">This field is required.</p>
          )}
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="start_time" className="form-label">
            Start Date & Time*
          </label>
          <Controller
            name="start_time"
            control={control}
            defaultValue={initialValue.date}
            render={({ field }) => (
              <DateTimePicker
                onChange={(e) => field.onChange(e)}
                value={field.value ? field.value : todayDate}
                minDate={initialValue.date}
                format="dd-MM-y h:mm a"
                disableClock={true}
                className="meeting-datetime-picker"
                required
              />
            )}
          />
          {errors.date && <p className="error-msg">This field is required.</p>}
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="duration" className="form-label">
            Duration*
          </label>
          <select
            className="form-control"
            name="duration"
            defaultValue={initialValue.duration}
            {...register("duration", { required: true })}
          >
            <option value="30">30</option>
            <option value="45">45</option>
            <option value="60">60</option>
            <option value="90">90</option>
            <option value="120">120</option>
            <option value="180">180</option>
            <option value="240">240</option>
          </select>
          {errors.duration && (
            <p className="error-msg">This field is required.</p>
          )}
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="recurring" className="form-label">
            Recurring*{" "}
          </label>
          <input
            type="checkbox"
            name="recurring"
            {...register("recurring")}
            onChange={(e) => {
              setValue("recurring", e.target.checked ? true : false);
              setCheckVal(!checkVal);
            }}
            checked={checkVal}
          />
          {recurring && (
            <div>
              <label htmlFor="numberOfWeek">Number of Week for Recurring</label>
              <input
                type="number"
                name="numberOfWeek"
                defaultValue={initialValue.numberOfWeek}
                {...register("numberOfWeek", {
                  required: "This field is required.",
                  min: {
                    value: 1,
                    message:
                      "You need to put more than one week for recurring.",
                  },
                })}
                className="form-control"
              />
              {errors.numberOfWeek && (
                <p className="error-msg">{errors.numberOfWeek.message}</p>
              )}
            </div>
          )}
        </div>
        {isMentor ? (
          ""
        ) : (
          <div className="mb-3 form-group">
            <label htmlFor="mentor" className="form-label">
              Mentor*
            </label>
            <input
              name="mentor"
              type="text"
              className="form-control"
              autoComplete="on"
              defaultValue={initialValue.mentor}
              {...register("mentor", {
                required: "Meeting Email cannot be empty.",
              })}
            />
            {errors.mentor && (
              <p className="error-msg">{errors.mentor.message}</p>
            )}
          </div>
        )}
        <div className="mb-3 form-group">
          <label htmlFor="agenda" className="form-label">
            Attendees*
          </label>
          <Controller
            name="attendees"
            control={control}
            row={5}
            defaultValue={initialValue.attendees}
            rules={{ required: true }}
            render={({ field }) => <RenderTextarea {...field} />}
          />
          <small>*Note: seperate multiple email addresses with new line.</small>
          {errors.attendees && (
            <p className="error-msg">This field is required.</p>
          )}
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

export default MeetingForm;
