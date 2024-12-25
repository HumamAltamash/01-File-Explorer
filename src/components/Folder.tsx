import { useState } from "react";
import { ExplorerItem } from "../models/ExplorerItem";
import "./Folder.css";

interface FolderProps {
  handleInsertNode: (folderId: string, item: string, isFolder: boolean) => void; // Return type updated to void, as insertNode does not return the updated tree directly.
  explorer: ExplorerItem;
}

interface ShowInputState {
  visible: boolean;
  isFolder: boolean;
}

function Folder(props: FolderProps) {
  const { handleInsertNode, explorer } = props;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const [showInput, setShowInput] = useState<ShowInputState>({
    visible: false,
    isFolder: false,
  });

  const showContents = () => {
    setIsExpanded(!isExpanded);
  };

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    isFolder: boolean
  ) => {
    e.stopPropagation();

    setIsExpanded(true);

    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    if (e.key === "Enter" && inputValue) {
      handleInsertNode(explorer.id, inputValue, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
      e.currentTarget.value = ""; // Clear the input after adding
    }
  };

  return (
    <div className="folder-container">
      {explorer.isFolder ? (
        <div>
          <div className="folder-name" onClick={showContents}>
            <span>📁 {explorer.name}</span>
            <div>
              <button onClick={(e) => handleButtonClick(e, true)}>
                Folder +
              </button>
              <button onClick={(e) => handleButtonClick(e, false)}>
                File +
              </button>
            </div>
            {showInput.visible && (
              <div>
                <span>{showInput.isFolder ? "📁" : "📄"}</span>
                <input
                  autoFocus
                  type="text"
                  onKeyDown={onAddFolder}
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                />
              </div>
            )}
          </div>
          {isExpanded && (
            <div className="folder-contents">
              {explorer.items.map((item) => (
                <Folder
                  handleInsertNode={handleInsertNode}
                  explorer={item}
                  key={item.id}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="file-name">📄 {explorer.name}</div>
      )}
    </div>
  );
}

export default Folder;
