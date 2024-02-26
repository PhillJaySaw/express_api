import prisma from "../modules/db";

export const getUpdates = async (req, res) => {
    const updates = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        select: {
            id: true,
            name: true,
            Update: true,
        },
    });

    res.json({ data: updates });
};

export const getUpdate = async (req, res) => {};

export const createUpdate = async (req, res) => {};

export const modifyUpdate = async (req, res) => {};

export const deleteUpdate = async (req, res) => {};
