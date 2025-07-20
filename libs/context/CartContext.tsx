import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Product } from "../types/product/product";

export type CartItem = Product & { quantity: number };

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void; // quantity optional
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

interface CartProviderProps {
	children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	// localStorage dan data yuklash
	useEffect(() => {
		const savedCart = localStorage.getItem("cartItems");
		if (savedCart) {
			try {
				const parsedCart = JSON.parse(savedCart);
				setCartItems(parsedCart);
			} catch (error) {
				console.error("Error parsing cart data:", error);
				setCartItems([]);
			}
		}
		setIsLoaded(true);
	}, []);

	// localStorage ga saqlash
	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem("cartItems", JSON.stringify(cartItems));
		}
	}, [cartItems, isLoaded]);

	const addToCart = (product: Product, quantity: number = 1) => {
		setCartItems((prev) => {
			const existingItem = prev.find((item) => item._id === product._id);

			if (existingItem) {
				return prev.map((item) =>
					item._id === product._id
						? { ...item, quantity: item.quantity + quantity }
						: item
				);
			}

			return [...prev, { ...product, quantity }];
		});
	};

	const removeFromCart = (productId: string) => {
		setCartItems((prev) => prev.filter((item) => item._id !== productId));
	};

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}

		setCartItems((prev) =>
			prev.map((item) =>
				item._id === productId ? { ...item, quantity } : item
			)
		);
	};

  const clearCart = () => {
    setCartItems([]); // memory state tozalandi
    localStorage.removeItem("cartItems"); // localStorage tozalandi
    window.location.reload(); // sahifa reload -> react context ham boshidan yuklanadi
  };

	const getCartTotal = () => {
		return cartItems.reduce(
			(total, item) => total + item.productPrice * item.quantity,
			0
		);
	};

	const getCartItemsCount = () => {
		return cartItems.reduce((count, item) => count + item.quantity, 0);
	};

	const value: CartContextType = {
		cartItems,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		getCartTotal,
		getCartItemsCount,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
