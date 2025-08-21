import fs from "fs";
import path from "path";
import { Request, Response } from "express";

export class FileController {
  downloadComprovante = async (req: Request, res: Response) => {
    const filename = req.params.filename;
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      filename
    );

    // Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "Arquivo não encontrado.",
      });
    }

    // Define headers para download
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/octet-stream");

    // Faz o download do arquivo
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error("Erro ao fazer download:", err);
        if (!res.headersSent) {
          return res.status(500).json({
            message: "Erro no download do arquivo.",
          });
        }
      }
    });
  };
}
