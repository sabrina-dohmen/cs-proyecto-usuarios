import { Request, Response } from "express";
import Usuario from "../models/usuario";

// --- GET ALL ---
export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
};

// --- GET ONE ---
export const getUsuarioById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    (usuario) ?
        res.json(usuario) :
        res.status(404).json({ msg: `Usuario ${id} no encontrado` });
};

// --- POST ---
export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        if (body.email != null) {
            // validar que el email sea unico en la base de datos
            const existeEmail = await Usuario.findOne({
                where: { email: body.email }
            });
            if (existeEmail) return res.status(400).json({ msg: `El email ${body.email} ya existe` });
        }

        body.estado = true; // el registro esta activo por defencto al haber sido creado
        // @ts-ignore -- Ignora error del body (Expected 0 arguments, but got 1)        
        const usuario = new Usuario(body);
        await usuario.save();
        res.json(usuario);

    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ msg: `Error al craer usuario` });
    }
};

// --- PUT ---
export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        // valida que existe el id en la base de datos
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(400).json({ msg: `El usuario ${id} no existe` });
        }

        if (body.email != null) {
            // validar que el email sea unico en la base de datos
            const existeEmail = await Usuario.findOne({
                where: { email: body.email }
            });
            if (existeEmail) return res.status(400).json({ msg: `El email ${body.email} ya existe` });
        }

        await usuario.update(body);
        res.json(usuario);

    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ msg: `Error al actualizar usuario` });
    }
};

// --- DELETE --------------------------------------------------------
export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // valida que existe el id en la base de datos
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(400).json({ msg: `El usuario ${id} no existe` });
        }

        // eliminacion fisica del registro
        // await usuario.destroy();
        // res.json({ msg: 'Usuario Eliminado de la Base de Datos' });

        await usuario.update({ estado: false });

    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ msg: `Error al eliminar usuario` });
    }
};