import { useState } from "react";

export default function SidePanel({ setNodes, setEdges, error }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    level: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: `n${prevNodes.length + 1}`,
        position: { x: Math.random() * 40, y: Math.random() * 40 },
        data: {
          label: formData.name,
          isLocked: true,
          description: formData.description,
          level: formData.level,
        },
      },
    ]);
    setFormData({ name: "", description: "", level: "" });
  };

  const handleClearAll = () => {
    setNodes([]);
    setEdges([]);
    localStorage.removeItem("skillTreeData");
  };

  return (
    <aside className="sidebar">
      {error && <div className="error-message">{error}</div>}
      <form className="skill-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter skill name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            required
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter skill description"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="level">Level:</label>
          <input
            required
            type="number"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter skill level"
            min="1"
            max="10"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Skill
        </button>
      </form>
      <button className="submit-btn" onClick={handleClearAll}>
        Clear All
      </button>
    </aside>
  );
}
