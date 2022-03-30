"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuarioById = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
// --- GET ALL ---
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json(usuarios);
});
exports.getUsuarios = getUsuarios;
// --- GET ONE ---
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    (usuario) ?
        res.json(usuario) :
        res.status(404).json({ msg: `Usuario ${id} no encontrado` });
});
exports.getUsuarioById = getUsuarioById;
// --- POST ---
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        if (body.email != null) {
            // validar que el email sea unico en la base de datos
            const existeEmail = yield usuario_1.default.findOne({
                where: { email: body.email }
            });
            if (existeEmail)
                return res.status(400).json({ msg: `El email ${body.email} ya existe` });
        }
        body.estado = true; // el registro esta activo por defencto al haber sido creado
        // @ts-ignore -- Ignora error del body (Expected 0 arguments, but got 1)        
        const usuario = new usuario_1.default(body);
        yield usuario.save();
        res.json(usuario);
    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ msg: `Error al craer usuario` });
    }
});
exports.postUsuario = postUsuario;
// --- PUT ---
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        // valida que existe el id en la base de datos
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({ msg: `El usuario ${id} no existe` });
        }
        if (body.email != null) {
            // validar que el email sea unico en la base de datos
            const existeEmail = yield usuario_1.default.findOne({
                where: { email: body.email }
            });
            if (existeEmail)
                return res.status(400).json({ msg: `El email ${body.email} ya existe` });
        }
        yield usuario.update(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ msg: `Error al actualizar usuario` });
    }
});
exports.putUsuario = putUsuario;
// --- DELETE --------------------------------------------------------
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // valida que existe el id en la base de datos
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({ msg: `El usuario ${id} no existe` });
        }
        // eliminacion fisica del registro
        // await usuario.destroy();
        // res.json({ msg: 'Usuario Eliminado de la Base de Datos' });
        yield usuario.update({ estado: false });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ msg: `Error al eliminar usuario` });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario-controller.js.map