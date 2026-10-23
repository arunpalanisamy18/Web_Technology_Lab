import { useEffect, useState } from "react"; 
import axios from "axios"; 

function App() { 
  const [students, setStudents] = useState([]); 
  const [formData, setFormData] = useState({ regNo: "", name: "", department: "", email: "", cgpa: "" }); 
  const [editId, setEditId] = useState(null); 
  
  // Pointing to your backend server running on port 3000
  const API = "http://localhost:5000/students"; 

  const fetchStudents = async () => { 
    try { 
      const response = await axios.get(API); 
      setStudents(response.data); 
    } catch (error) { 
      console.log(error); 
    } 
  }; 

  useEffect(() => { 
    fetchStudents(); 
  }, []); 

  const handleChange = (event) => { 
    setFormData({...formData, [event.target.name]: event.target.value }); 
  }; 

  const handleSubmit = async (event) => { 
    event.preventDefault(); 
    try { 
      if (editId) { 
        await axios.put(`${API}/${editId}`, formData); 
        setEditId(null); 
      } else { 
        await axios.post(API, formData); 
      } 
      setFormData({ regNo: "", name: "", department: "", email: "", cgpa: "" }); 
      fetchStudents(); 
    } catch (error) { 
      console.log(error); 
    } 
  }; 

  const handleEdit = (student) => { 
    setFormData({ regNo: student.regNo, name: student.name, department: student.department, email: student.email, cgpa: student.cgpa }); 
    setEditId(student._id); 
  }; 

  const handleDelete = async (id) => { 
    try { 
      await axios.delete(`${API}/${id}`); 
      fetchStudents(); 
    } catch (error) { 
      console.log(error); 
    } 
  }; 

  return ( 
    <div> 
      <h1>Student Management System</h1> 
      <form onSubmit={handleSubmit}> 
        <input type="text" name="regNo" placeholder="Register Number" value={formData.regNo} onChange={handleChange} required /> 
        <input type="text" name="name" placeholder="Student Name" value={formData.name} onChange={handleChange} required /> 
        <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required /> 
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /> 
        <input type="number" step="0.01" name="cgpa" placeholder="CGPA" value={formData.cgpa} onChange={handleChange} /> 
        <button type="submit"> 
          {editId ? "Update Student" : "Add Student"} 
        </button> 
      </form> 
      <hr /> 
      <h2>Student List</h2> 
      <table border="1"> 
        <thead> 
          <tr> 
            <th>Register No</th> 
            <th>Name</th> 
            <th>Department</th> 
            <th>Email</th> 
            <th>CGPA</th> 
            <th>Actions</th> 
          </tr> 
        </thead> 
        <tbody> 
          {students.map(student => ( 
            <tr key={student._id}> 
              <td>{student.regNo}</td> 
              <td>{student.name}</td> 
              <td>{student.department}</td> 
              <td>{student.email}</td> 
              <td>{student.cgpa}</td> 
              <td> 
                <button onClick={() => handleEdit(student)}> Edit </button> 
                <button onClick={() => handleDelete(student._id)}> Delete </button> 
              </td> 
            </tr> 
          ))} 
        </tbody> 
      </table> 
    </div> 
  ); 
} 

export default App;
