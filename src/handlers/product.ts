import prisma from "../modules/db";

export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id,
        },
        include: {
            products: true,
        },
    });

    res.json({ data: user.products });
};

export const getProduct = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            id: req.params.id,
            belongsToId: req.user.id,
        },
    });

    if (!product) {
        res.json({ data: { message: "product not found :(" } });
        return;
    }

    res.json({ data: product });
};

export const createProduct = async (req, res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id,
        },
    });

    res.json({ data: product });
};

export const updateProduct = async (req, res) => {
    // TODO catch error
    const update = await prisma.product.update({
        where: {
            id: req.params.id,
            belongsToId: req.user.id,
        },
        data: {
            name: req.body.name,
        },
    });

    res.json({ data: update });
};

export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id: req.params.id,
            // TODO this might break becuase of missing index
            belongsToId: req.user.id,
        },
    });

    res.json({ data: deleted });
};
