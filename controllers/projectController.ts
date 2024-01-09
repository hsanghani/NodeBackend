// import { Request, Response } from "express";
// import asyncHandler from "express-async-handler";
// import {
//   createProject,
//   deleteProject,
//   getProjectById,
//   getProjects,
//   updateProject,
// } from "../services/projectService";

// //@desc Get all projects
// //@route GET /api/projects
// //@access Public
// export const getAllProjectsHandler = asyncHandler(
//   async (req: Request, res: Response) => {
//     const projects = await getProjects();
//     res.status(200).json(projects);
//   }
// );

// //@desc Create a new project
// //@route POST /api/projects
// //@access Private
// export const createProjectHandler = asyncHandler(
//   async (req: Request, res: Response) => {
//     const project = await createProject(req.body);
//     res.status(201).json(project);
//   }
// );

// //@desc Get a Project by id
// //@route GET /api/projects/:id
// //@access Public
// export const getProjectHandler = asyncHandler(
//   async (req: Request, res: Response) => {
//     const project = await getProjectById(req.params.id);
//     res.status(200).json(project);
//   }
// );

// //@desc Delete a Project by id
// //@route DELETE /api/projects/:id
// //@access Private
// export const deleteProjectHandler = asyncHandler(
//   async (req: Request, res: Response) => {
//     const project = await deleteProject(req.params.id);
//     res.status(200).json({
//       message: `Project ${req.params.id} deleted`,
//       project: project,
//     });
//   }
// );

// //@desc Update a Project by id
// //@route PUT /api/projects/:id
// //@access private
// export const updateProjectHandler = asyncHandler(
//   async (req: Request, res: Response) => {
//     const project = await updateProject(req.params.id, req.body);
//     res.json({
//       message: `Project ${req.params.id} updated`,
//       project: project,
//     });
//   }
// );
