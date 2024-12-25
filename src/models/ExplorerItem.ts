export interface ExplorerItem {
  id: string; // Unique identifier
  name: string; // Name of the file or folder
  isFolder: boolean; // Indicates if the item is a folder
  items: ExplorerItem[]; // Nested items (empty for files)
}
