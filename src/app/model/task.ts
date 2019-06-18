
export interface Task {
  id:string;
  titles: {
    description:string;
    longDescription: string;
  };
  iconUrl: string;
  uploadedImageUrl:string;
  taskListIcon: string;
  categories:string[];
  subTaskCount:number;
}
