import { ExplorerItem } from "../models/ExplorerItem";

const useTraverseTree = () => {
  const insertNode = (
    tree: ExplorerItem,
    folderId: string,
    item: string,
    isFolder: boolean
  ): ExplorerItem => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime().toString(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }

    const updatedItems = tree.items.map((child) =>
      insertNode(child, folderId, item, isFolder)
    );

    return { ...tree, items: updatedItems };
  };

  const deleteNode = () => {
    // TODO
  };

  const updateNode = () => {
    // TODO
  };

  return { insertNode, deleteNode, updateNode };
};

export default useTraverseTree;
