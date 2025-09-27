import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import SidePanel from "./components/SidePanel";
import HeaderPanel from "./components/HeaderPanel";
import "./App.css";
import FooterPanel from "./components/FooterPanel";

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  //Load from localStorage on app reload.
  useEffect(() => {
    const savedData = localStorage.getItem("skillTreeData");
    if (savedData) {
      const { nodes, edges } = JSON.parse(savedData);
      setNodes(nodes);
      setEdges(edges);
    }
  }, []);

  //Save the skill tree to localStorage on changes.
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      localStorage.setItem("skillTreeData", JSON.stringify({ nodes, edges }));
    }
  }, [nodes, edges]);

  //search and filter by searchTerm
  const filteredNodes = nodes.map((node) => {
    const isHighlighted =
      searchTerm && node.data.label.toLowerCase() === searchTerm.toLowerCase();

    return {
      ...node,
      style: {
        ...node.style,
        border: isHighlighted ? "3px solid #222138" : "1px solid #222138",
      },
    };
  });

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

  const onEdgesChange = useCallback((changes) => {
    setEdges((edgesSnapshot) => {
      const newEdges = applyEdgeChanges(changes, edgesSnapshot);
      return newEdges;
    });
  }, []);

  const onConnect = useCallback(
    (params) => {

      //Prevent circular dependencies connection
      const cycleSourceId = edges.map((edge) => edge.source);
      const cycleTargetId = edges.map((edge) => edge.target);

      if (
        cycleSourceId.includes(params.target) &&
        cycleTargetId.includes(params.source)
      ) {
        setError(
          "Adding this edge would create a cycle! Connection not added."
        );
        return;
      }

      setEdges((edgesSnapshot) =>
        addEdge(
          { ...params, markerEnd: { type: "arrowclosed" } },
          edgesSnapshot
        )
      );
    },
    [edges]
  );

  const onNodeClick = useCallback(
    (event, clickedNode) => {

      //determine parent-child relation and confirm prerequisites are met before unlocking nodes
      const childEdges = edges.filter((edge) => edge.source === clickedNode.id);

      const childNodes = nodes.filter((node) =>
        childEdges.find((edge) => edge.target === node.id)
      );

      const allChildUnlocked = childNodes.every(
        (child) => !child.data.isLocked
      );

      allChildUnlocked
        ? setNodes((prevNodes) => {
            return prevNodes.map((n) => {
              if (n.id !== clickedNode.id) return n;
              return {
                ...n,
                style: {
                  ...n.style,
                  backgroundColor: "#4ade80",
                  color: "white",
                },
                data: {
                  ...n.data,
                  isLocked: false,
                },
              };
            });
          })
        : setError("All child skills must be unlocked first!");
    },
    [nodes, edges]
  );

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 3000);
    }
  }, [error]);

  return (
    <div className="app-container">
      <HeaderPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="main-content">
        <SidePanel setEdges={setEdges} setNodes={setNodes} error={error} />
        <main className="main">
          <ReactFlow
            nodes={filteredNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </main>
      </div>

      <FooterPanel />
    </div>
  );
}

export default App;
