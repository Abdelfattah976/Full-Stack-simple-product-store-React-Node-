import mongoose from 'mongoose';
import Product from '../model/product.model.js';

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log(`Error fetching products: ${error.message}`);
		res.status(500).json({ success: false, message: 'Error fetching products' });
	}
};

export const creatingProduct = async (req, res) => {
	const product = req.body;

	if (!product.name || !product.price || !product.image) {
		res.status(500).json({ success: false, message: 'All fields are required' });
	}
	const newProduct = new Product(product);
	try {
		await newProduct.save();
		res.status(200).json({ success: true, data: newProduct });
	} catch (error) {
		console.log(`Error adding products: ${error.message}`);
		res.status(500).json({ success: false, message: 'Error adding products' });
	}
};

export const updatingProduct = async (req, res) => {
	const { id } = req.params;
	const product = req.body;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(500).json({ success: false, message: 'Product not found' });
	}
	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		console.log(`Error adding products: ${error.message}`);
		res.status(500).json({ success: false, message: 'Error updating the product' });
	}
};

export const deletingProduct = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(500).json({ success: false, message: 'Product not found' });
	}
	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: 'product deleted successfully' });
	} catch (error) {
		console.log(`Error deleting products: ${error.message}`);
		res.status(500).json({ success: false, message: 'Error deleting the product' });
	}
};
