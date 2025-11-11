import express from 'express';
import {
	getAllProducts,
	creatingProduct,
	updatingProduct,
	deletingProduct,
} from '../controllers/product.controllers.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', creatingProduct);
router.put('/:id', updatingProduct);
router.delete('/:id', deletingProduct);

export default router;
