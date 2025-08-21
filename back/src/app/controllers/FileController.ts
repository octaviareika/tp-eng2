import fs from "fs";
import path from "path";
import { Request, Response } from "express";

export class FileController {
  viewComprovante = async (req: Request, res: Response) => {
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

    // Define o tipo de conteúdo baseado na extensão do arquivo
    const ext = path.extname(filename).toLowerCase();
    let contentType;

    switch (ext) {
      case ".pdf":
        contentType = "application/pdf";
        break;
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".gif":
        contentType = "image/gif";
        break;
      default:
        contentType = "application/octet-stream";
    }

    // Define headers para visualização inline (abre no navegador)
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", "inline"); // inline = abre no navegador

    // Envia o arquivo
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Erro ao visualizar arquivo:", err);
        return res.status(500).json({
          message: "Erro ao carregar o arquivo.",
        });
      }
    });
  };

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
