import React, { useContext } from "react";
import taskContext from "../context/task/taskContext";

function TaskItem(props) {
  const { title, description, _id, status } = props.task;
  const { update, showAlert } = props;
  const context = useContext(taskContext);
  const { deleteTask, updateTask } = context;

  const handleDelete = async () => {
    const json = await deleteTask(_id);
    showAlert(json.message, json.status ? "success" : "danger");
  };

  const handleStatusToggle = async () => {
    const newStatus = status === "Pending" ? "Completed" : "Pending";
    const json = await updateTask(_id, title, description, newStatus);
    showAlert(
      json.status ? `Task marked as ${newStatus}` : json.message,
      json.status ? "success" : "danger"
    );
  };

  const handleUpdate = () => {
    update(props.task);
  };

  return (
    <div className="card w-100 shadow-sm">
      <div className="card-body position-relative">
        {/* Top action icons */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <input
            type="checkbox"
            className="form-check-input mt-1"
            checked={status === "Completed"}
            onChange={handleStatusToggle}
            title={`Mark as ${status === "Pending" ? "Completed" : "Pending"}`}
          />
          <div>
            <i
              className="far fa-edit me-3 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleUpdate}
              title="Edit Task"
            ></i>
            <i
              className="far fa-trash-alt text-danger"
              style={{ cursor: "pointer" }}
              onClick={handleDelete}
              title="Delete Task"
            ></i>
          </div>
        </div>

        {/* Content */}
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <span
          className={`badge bg-${
            status === "Completed" ? "success" : "warning"
          } text-dark`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default TaskItem;
