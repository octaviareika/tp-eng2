// src/types/express-session/index.d.ts
import "express-session";

declare module "express-session" {
  interface SessionData {
    usuario?: {
      id: number;
      nome: string;
      tipo: "aluno" | "funcionario";
      matricula?: string;
      cargo?: string;
      curso?: string;
    };
  }
}
