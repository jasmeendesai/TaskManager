import React, { useContext, useState } from "react";
import taskContext from "../context/task/taskContext";

function AddTask(props) {
  const { showAlert } = props;
  const context = useContext(taskContext);
  const { addTask } = context;

  const [task, setTask] = useState({ title: "", description: "" });

  const handleCLick = async (e) => {
    e.preventDefault();
    const json = await addTask(task.title, task.description);

    if (json.status === true) {
      showAlert(json.message, "success");
    } else {
      showAlert(json.message, "danger");
    }
    setTask({ title: "", description: "" });
  };
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3 mx-2">
      <h2>Add a Task</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleChange}
            value={task.title}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={handleChange}
            value={task.description}
            minLength={3}
            required
          />
        </div>

        <button
          type="submit"
          disabled={task.title.length < 3 || task.description.length < 3}
          className="btn btn-primary"
          onClick={handleCLick}
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
