import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsArrowRight } from 'react-icons/bs';
import './styles/Project.css';

function Project() {
  const [showAll, setShowAll] = useState(false);
  const [projectDetails, setProjectDetails] = useState([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    department: '',
    status: 'In Progress',
  });
  const [profits, setProfits] = useState([]);
  const [showProfitDetails, setShowProfitDetails] = useState(false); // State variable for controlling profit details pop-up

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/projects');
      setProjectDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const toggleAddingProject = () => {
    setIsAddingProject(!isAddingProject);
  };

  const toggleProfitDetails = () => {
    setShowProfitDetails(!showProfitDetails);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addProject = async () => {
    try {
      const projectValue = parseFloat(newProject.value);
      const projectProfit = projectValue * 0.1;
      await axios.post('http://localhost:3001/projects', newProject);
      setNewProject({
        title: '',
        department: '',
        value: '',
        status: 'In Progress',
      });
      setProfits((prevProfits) => [
        ...prevProfits,
        { title: newProject.title, profit: projectProfit },
      ]);
      toggleAddingProject();
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const projectDetailsLength = projectDetails.length;

  return (
    <div className="project-container row">
      <div className="project-card">
        <div className="card-header">
          <h6 className="card-title">
            Project Details <span className="length"> {projectDetailsLength}</span>
          </h6>
          <button className="button" onClick={toggleShowAll}>
            {showAll ? 'Collapse' : 'See All'} <BsArrowRight className="arrow" />
          </button>
        </div>
        <div>
          <hr />
          <table className="table">
            <tbody>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Value</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              {projectDetails.slice(0, showAll ? projectDetails.length : 2).map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.department}</td>
                  <td>{project.value}</td>
                  <td>
                    <span
                      className={`status-indicator ${
                        project.status === 'Completed' ? 'completed' : 'in-progress'
                      }`}
                    />
                    {project.status}
                  </td>
                  <td>
                    <button className="button" onClick={() => deleteProject(project.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="add-button-container">
          <button className="add-button m-3" onClick={toggleAddingProject}>
            Add Project
          </button>
          <button className="add-button" onClick={toggleProfitDetails}>Profit</button>
        </div>
      </div>

      {isAddingProject && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add New Project</h2>
            <div className="form-group">
              <label htmlFor="title">Project Title:</label>
              <input type="text" id="title" name="title" value={newProject.title} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <input
                type="text"
                id="department"
                name="department"
                value={newProject.department}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="value">Value:</label>
              <input
                type="number"
                id="value"
                name="value"
                value={newProject.value}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select id="status" name="status" value={newProject.status} onChange={handleInputChange}>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="popup-buttons">
              <button className="btn btn-primary" onClick={addProject}>
                Add
              </button>
              <button className="btn btn-primary" onClick={toggleAddingProject}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display individual project profits */}
      {showProfitDetails && profits.length > 0 && (
        <div className="profit-details-popup">
          <div className="profit-details-content">
            <h3>Profit Details</h3>
            <ul>
              {profits.map((project) => (
                <li key={project.title}>
                  <strong>{project.title}:</strong> {project.profit}
                </li>
              ))}
            </ul>
            <button className="btn btn-secondary" onClick={toggleProfitDetails}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;
