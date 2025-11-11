import { create } from 'zustand';

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createNewProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.price || !newProduct.image) {
			return { success: false, message: 'Please fill in  all the fields.' };
		}
		const res = await fetch('/api/products', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: 'Product created successfully.' };
	},
	getProducts: async () => {
		const res = await fetch('/api/products');
		const data = await res.json();
		set({ products: data.data });
	},
	updateProduct: async (id, updatedProduct) => {
		if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
			return { success: false, message: 'Please fill in  all the fields.' };
		}
		const res = await fetch(`/api/products/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		set((state) => ({ products: state.products.map((prod) => (prod._id === id ? data.data : prod)) }));
		return { success: true, message: data.message };
	},
	deleteProduct: async (id) => {
		const res = await fetch(`/api/products/${id}`, {
			method: 'DELETE',
		});
		set((state) => ({
			products: state.products.filter((prod) => prod._id !== id),
		}));
		const data = await res.json();
		return { success: true, message: data.message };
	},
}));
