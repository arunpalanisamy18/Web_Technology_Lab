
import { useState } from "react";
import "./App.css";
import StatCard from "./components/StatCard";

const courses = [
  "Web Technology",
  "Database Management",
  "Machine Learning",
  "Computer Networks",
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask(event) {
    event.preventDefault();

    if (!task.trim()) return;

    setTasks((previousTasks) => [
      ...previousTasks,
      {
        id: Date.now(),
        title: task.trim(),
        completed: false,
      },
    ]);

    setTask("");
  }

  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((item) => item.id !== id)
    );
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <header className="header">
        <h2>EduDashboard</h2>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#courses">Courses</a>
          <a href="#tasks">Tasks</a>
        </nav>

        <button
          className="profile-btn"
          onClick={() => setDarkMode((previous) => !previous)}
        >
          {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
      </header>

      <main className="dashboard" id="home">
        <section className="welcome">
          <h1>Welcome Back!</h1>
          <p>Here is your academic overview.</p>
        </section>

        <section className="cards">
          <StatCard title="Courses" value="6" />
          <StatCard title="Assignments" value="12" />
          <StatCard title="Attendance" value="92%" />
          <StatCard title="CGPA" value="8.7" />
        </section>

        <section className="course-section" id="courses">
          <h2>My Courses</h2>

          <div className="course-list">
            {courses.map((course, index) => (
              <div className="course-item" key={course}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {course}
              </div>
            ))}
          </div>
        </section>

        <section className="task-section" id="tasks">
          <h2>My Tasks</h2>

          <form className="task-form" onSubmit={addTask}>
            <input
              type="text"
              placeholder="Enter a task"
              value={task}
              onChange={(event) => setTask(event.target.value)}
              aria-label="Enter a task"
            />

            <button type="submit">Add Task</button>
          </form>

          <div className="task-list">
            {tasks.length === 0 ? (
              <p className="empty-state">
                No tasks yet. Add your first task!
              </p>
            ) : (
              tasks.map((item) => (
                <div className="task-item" key={item.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleTask(item.id)}
                    />

                    <span
                      className={
                        item.completed ? "completed" : ""
                      }
                    >
                      {item.title}
                    </span>
                  </label>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteTask(item.id)}
                    aria-label={`Delete ${item.title}`}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <footer className="footer">
          Student Dashboard | ReactJS and Vite
        </footer>
      </main>
    </div>
  );
}

export default App;
