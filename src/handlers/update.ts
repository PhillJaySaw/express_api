import prisma from "../modules/db";

export const getUpdates = async (req, res) => {
    const updates = await prisma.update.findMany({
        where: {
            product: {
                belongsToId: req.user.id,
            },
        },
    });

    res.json({ data: updates });
};

export const getUpdate = async (req, res) => {
    const update = await prisma.update.findFirst({
        where: {
            id: req.params.id,
            product: {
                belongsToId: req.user.id,
            },
        },
    });

    if (!update) {
        return res.json({ data: { message: "Update not found" } });
    }

    res.json({ data: update });
};

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: { id: req.body.productId },
    });

    if (!product) {
        return res.json({ message: "Product not found" });
    }

    const update = await prisma.update.create({ data: req.body });

    res.json({ data: update });
};

export const modifyUpdate = async (req, res) => {
    const { id: updateId } = req.params.id;

    const update = await prisma.update.findFirst({
        where: {
            id: updateId,
            product: {
                belongsToId: req.user.id,
            },
        },
    });

    if (!update) {
        return res.json({ data: { message: "Update not found" } });
    }

    const modifiedUpdate = await prisma.update.update({
        where: {
            id: req.params.id,
        },
        data: req.body,
    });

    res.json({ data: modifiedUpdate });
};

export const deleteUpdate = async (req, res) => {
    const { id: updateId } = req.params.id;

    const update = await prisma.update.findFirst({
        where: {
            id: updateId,
            product: {
                belongsToId: req.user.id,
            },
        },
    });

    if (!update) {
        return res.json({ data: { message: "Update not found" } });
    }

    const deletedUpdate = await prisma.update.delete({
        where: { id: req.params.id },
    });

    res.json({ data: deletedUpdate });
};
