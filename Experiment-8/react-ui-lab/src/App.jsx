
import { useState } from "react";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";
import "./App.css";

const courses = [
  { id: 1, name: "Web Technology", progress: 75, color: "purple" },
  { id: 2, name: "Database Management", progress: 60, color: "blue" },
  { id: 3, name: "Machine Learning", progress: 45, color: "orange" },
  { id: 4, name: "Computer Networks", progress: 90, color: "green" },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete React assignment", completed: false },
    { id: 2, title: "Study DBMS concepts", completed: false },
  ]);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  function addTask(event) {
    event.preventDefault();

    if (!task.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), title: task.trim(), completed: false },
    ]);

    setTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  const completedTasks = tasks.filter((item) => item.completed).length;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        search={search}
        setSearch={setSearch}
      />

      <main className="dashboard" id="home">
        <section className="welcome-section">
          <div>
            <p className="subtitle">STUDENT DASHBOARD</p>
            <h1>Welcome back, Arun! 👋</h1>
            <p>Here's an overview of your academic progress.</p>
          </div>
          <div className="welcome-icon">🎓</div>
        </section>

        <section className="stats-grid">
          <StatCard title="Courses" value="4" icon="📚" />
          <StatCard
            title="Tasks Completed"
            value={`${completedTasks}/${tasks.length}`}
            icon="✅"
          />
          <StatCard title="Attendance" value="92%" icon="📅" />
          <StatCard title="CGPA" value="8.7" icon="🏆" />
        </section>

        <section className="section" id="courses">
          
<div className="section-heading">
  <div>
    <p className="subtitle">KEEP LEARNING</p>
    <h2>My Courses</h2>
  </div>

  <div className="course-heading-actions">
    <input
      className="course-search"
      type="search"
      placeholder="Search courses..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      aria-label="Search courses"
    />
    <span>{filteredCourses.length} courses</span>
  </div>
</div>


          <div className="course-grid">
            {filteredCourses.map((course) => (
              <article className="course-card" key={course.id}>
                <div className="course-heading">
                  <span className={`course-icon ${course.color}`}>📘</span>
                  <span className="course-label">IN PROGRESS</span>
                </div>

                <h3>{course.name}</h3>

                <div className="progress-info">
                  <span>Course completion</span>
                  <strong>{course.progress}%</strong>
                </div>

                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-label={`${course.name} completion`}
                  aria-valuenow={course.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`progress-fill ${course.color}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </article>
            ))}

            {filteredCourses.length === 0 && (
              <p>No courses found.</p>
            )}
          </div>
        </section>

        <section className="section task-section" id="tasks">
          <div className="section-heading">
            <div>
              <p className="subtitle">STAY ORGANIZED</p>
              <h2>My Tasks</h2>
            </div>
            <span>{tasks.length - completedTasks} remaining</span>
          </div>

          <form className="task-form" onSubmit={addTask}>
            <input
              type="text"
              value={task}
              onChange={(event) => setTask(event.target.value)}
              placeholder="Enter a new task..."
              aria-label="New task"
            />
            <button type="submit">+ Add Task</button>
          </form>

          {tasks.map((item) => (
            <div className="task-item" key={item.id}>
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                />
                <span className={item.completed ? "completed" : ""}>
                  {item.title}
                </span>
              </label>

              <button
                className="delete-button"
                onClick={() => deleteTask(item.id)}
                aria-label={`Delete ${item.title}`}
              >
                Delete
              </button>
            </div>
          ))}

          {tasks.length === 0 && (
            <p className="empty-message">No tasks yet. Add your first task!</p>
          )}
        </section>

        <footer className="footer">
          Student Dashboard | Built with ReactJS
        </footer>
      </main>
    </div>
  );
}

export default App;
