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

export const getUpdate = async (req, res) => {
    const productsWithUpdates = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        select: {
            Update: true,
        },
    });

    if (!productsWithUpdates) {
        return res.json({
            data: { message: "No products found for this user" },
        });
    }

    // TODO figure out how to do this in prisma request
    const updates = productsWithUpdates.map((product) => product.Update).flat();
    const update = updates.find((update) => update.id === req.params.id);

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
        return res.json({ message: "Prodcut not found" });
    }

    const update = await prisma.update.create({ data: req.body });

    res.json({ data: update });
};

export const modifyUpdate = async (req, res) => {
    const prodcut = await prisma.product.findUnique({
        where: { id: req.body.productId, belongsToId: req.user.id },
    });

    if (!prodcut) {
        return res.json({ data: { message: "Product not found" } });
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
    const productsWithUpdates = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        select: {
            Update: true,
        },
    });

    if (!productsWithUpdates) {
        return res.json({
            data: { message: "No products found for this user" },
        });
    }

    // TODO figure out how to do this in prisma request
    const updates = productsWithUpdates.map((product) => product.Update).flat();
    const update = updates.find((update) => update.id === req.params.id);

    if (!update) {
        return res.json({
            data: { message: "udpate not found" },
        });
    }

    const deletedUpdate = await prisma.update.delete({
        where: { id: req.params.id },
    });

    res.json({ data: deletedUpdate });
};
