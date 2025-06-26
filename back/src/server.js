"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./database/data-source");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const routes_1 = require("./app/routes/routes");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.routes);
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Banco conectado com sucesso");
    app.listen(8080, () => {
        console.log("Server rodando!");
    });
})
    .catch((error) => {
    console.error("Erro ao conectar ao banco: ", error);
});
