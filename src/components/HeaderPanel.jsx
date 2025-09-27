export default function HeaderPanel({ searchTerm, setSearchTerm }) {
  return (
    <header className="header">
      <h1>Create Skill Tree Builder</h1>
      <input
        type="text"
        placeholder="Search skills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </header>
  );
}
