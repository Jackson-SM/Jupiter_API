import { Project } from "../../../../domain/entities/Project/Project";
import prisma from "../client/prisma";
import Boom from "@hapi/boom";
import { ProjectRepository } from "~/domain/repositories/ProjectRepository";
import { PrismaProjectMapper } from "../mappers/prisma-project-mapper";

export class PrismaProjectRepository implements ProjectRepository {
  async findById(id: string): Promise<Project | null> {
    try {
      const project = await prisma.project.findUnique({ where: { id: id } });

      if (!project) {
        return null;
      }

      return PrismaProjectMapper.toDomain(project);
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Invalid");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async findAllByWorkspaceId(workspaceId: string): Promise<Project[]> {
    try {
      const projects = await prisma.project.findMany({
        where: { workspaceId: workspaceId },
      });

      return projects.map((project) => PrismaProjectMapper.toDomain(project));
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Invalid");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async findAllByLeadId(leadId: string): Promise<Project[]> {
    try {
      const projects = await prisma.project.findMany({
        where: { leadId: leadId },
      });

      return projects.map((project) => PrismaProjectMapper.toDomain(project));
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Invalid");
      }
      throw Boom.badRequest(err.message);
    }
  }

  async create(project: Project): Promise<void> {
    const raw = PrismaProjectMapper.toPrisma(project);

    await prisma.project.create({
      data: raw,
    });
  }
}