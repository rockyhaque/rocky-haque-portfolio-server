export interface IProject {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  image: string;
  githubLink?: string;
  clientSideRepo?: string;
  serverSideRepo?: string;
  liveLink?: string;
  createdAt: Date;
  updatedAt: Date;
}