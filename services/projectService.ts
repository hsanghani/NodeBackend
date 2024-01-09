// import ProjectModel from "../models/projectModel";
// import { ProjectType } from "../types/projectTypes";
// import { IProjectSchema } from "../schema/projectSchema";
// import { checkIsValidObjectId } from "../database/db";
// import { sanitizeProject } from "../sanitizers/projectSanitizer";

// export async function getProjects(): Promise<ProjectType[]> {
//   try {
//     const projects = await ProjectModel.find();
//     if (!projects) throw new Error("No projects found");
//     return projects;
//   } catch (err) {
//     throw new Error("Projects not found");
//   }
// }

// export async function createProject(
//   project: ProjectType
// ): Promise<ProjectType> {
//   const sanitizedProject = sanitizeProject(project)
//   try {
//     const newProject = await ProjectModel.create(sanitizedProject);
//     if (!newProject) throw new Error("project not created");
//     return newProject;
//   } catch (err) {
//     throw new Error("project not created");
//   }
// }

// export async function getProjectById(
//   projectId: string
// ): Promise<IProjectSchema> {
//   checkIsValidObjectId(projectId);
//   try {
//     const project = await ProjectModel.findById(projectId);
//     if (!project) throw new Error("project not found");
//     return project;
//   } catch (err) {
//     throw new Error("Error finding project");
//   }
// }

// export async function updateProject(
//   projectId: string,
//   project: ProjectType
// ): Promise<void> {
//   checkIsValidObjectId(projectId);
//   const sanitizedProject = sanitizeProject(project)
//   try {
//     const updatedProject = await ProjectModel.findByIdAndUpdate(
//       projectId,
//       sanitizedProject,
//       { new: true }
//     );
//     if (!updatedProject) throw new Error("Project not found");

//     return;
//   } catch (err) {
//     throw new Error("Error updating project");
//   }
// }

// export async function deleteProject(
//   projectId: string
// ): Promise<IProjectSchema> {
//   checkIsValidObjectId(projectId);
//   try {
//     const deleteProject = await ProjectModel.findByIdAndDelete(projectId);
//     if (!deleteProject) throw new Error("Error Deleting project");
//     return deleteProject;
//   } catch (err) {
//     throw new Error("Error deleting project");
//   }
// }
