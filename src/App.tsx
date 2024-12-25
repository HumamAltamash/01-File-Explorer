import { useState } from "react";
import explorer from "./data/folderData";
import { ExplorerItem } from "./models/ExplorerItem";
import Folder from "./components/Folder";
import "./App.css";
import useTraverseTree from "./hooks/useTraverseTree";

function App() {
  const [explorerData, setExplorerData] = useState<ExplorerItem>(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (
    folderId: string,
    item: string,
    isFolder: boolean
  ) => {
    const updatedTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(updatedTree); // Properly update state
  };

  return (
    <div className="app-container">
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}

export default App;
