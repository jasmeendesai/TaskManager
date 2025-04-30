import React, { useContext, useEffect, useRef, useState } from "react";
import taskContext from "../context/task/taskContext";
import TaskItem from "./TaskItem";
import AddTask from "./AddTask";
import { useNavigate } from "react-router-dom";

function Task(props) {
  const { showAlert } = props;
  const context = useContext(taskContext);
  const { tasks, getTask, updateTask } = context;
  const navigate = useNavigate();

  const ref = useRef(null);
  const refClose = useRef(null);
  const [task, setTask] = useState({
    id: "",
    etitle: "",
    edescription: "",
    estatus: "",
  });
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTask(statusFilter);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [statusFilter]);

  const update = (currenttask) => {
    ref.current.click();

    setTask({
      id: currenttask._id,
      etitle: currenttask.title,
      edescription: currenttask.description,
      estatus: currenttask.status,
    });
  };

  const handleCLick = async (e) => {
    const json = await updateTask(
      task.id,
      task.etitle,
      task.edescription,
      task.estatus
    );
    if (json.status === true) {
      showAlert(json.message, "success");
    } else {
      showAlert(json.message, "danger");
    }
    refClose.current.click();
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div>
      <AddTask showAlert={showAlert} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={task.etitle}
                    onChange={handleChange}
                    minLength={3}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={task.edescription}
                    onChange={handleChange}
                    minLength={3}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary d-none"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                disabled={
                  task.etitle.length < 3 || task.edescription.length < 3
                }
                className="btn btn-primary"
                onClick={handleCLick}
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <h2 className="mb-4 text-center text-primary">Your Tasks</h2>

        <div className="mb-5 d-flex align-items-center gap-3">
          <label htmlFor="taskFilter" className="form-label mb-0 fw-semibold">
            Filter:
          </label>
          <select
            id="taskFilter"
            className="form-select w-auto"
            value={statusFilter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {tasks?.length === 0 || !tasks ? (
          <div className="alert alert-warning text-center">
            No tasks to display
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {tasks?.map((task) => (
              <div className="card w-100 shadow-sm" key={task._id}>
                <div className="card-body">
                  <TaskItem update={update} task={task} showAlert={showAlert} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
