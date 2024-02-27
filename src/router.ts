import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from "./handlers/product";
import {
    createUpdate,
    deleteUpdate,
    getUpdate,
    getUpdates,
    modifyUpdate,
} from "./handlers/update";

export const router = Router();

/* PRODUCTS */
router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.post(
    "/product",
    [body("name").isString(), handleInputErrors],
    body(),
    createProduct,
);
router.put(
    "/product/:id",
    [body("name").isString(), handleInputErrors],
    updateProduct,
);
router.delete("/product/:id", deleteProduct);

/* UPDATE */
router.get("/update", getUpdates);
router.get("/update/:id", getUpdate);
router.post(
    "/update",
    [
        body("title").exists().isString(),
        body("body").exists().isString(),
        body("productId").exists().isString(),
        handleInputErrors,
    ],
    createUpdate,
);
router.put(
    "/update/:id",
    [
        body("title").optional(),
        body("body").optional(),
        body("status")
            .isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"])
            .optional(),
        body("version").optional(),
        body("productId").exists().isString(),
        handleInputErrors,
    ],
    modifyUpdate,
);
router.delete("/update/:id", deleteUpdate);

/* UPDATE POINT */
router.get("/updatePoint", () => {});
router.get("/updatePoint/:id", () => {});
router.put(
    "/updatePoint/:id",
    [
        body("name").optional().isString(),
        body("description").optional().isString(),
    ],
    () => {},
);
router.post(
    "/updatePoint",
    [
        body("name").exists().isString(),
        body("description").exists().isString(),
        body("updateId").exists().isString(),
    ],
    () => {},
);
router.delete("/updatePoint/:id", () => {});

router.use((err, req, res, next) => {
    console.log(err);

    res.status(400).json({ message: err });
});
