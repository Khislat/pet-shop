import {
	ProductCategory,
	ProductStatus,
	ProductWeight,
} from "../../enums/product.enum";

export interface ProductUpdate {
	_id: string;
	productCategory: ProductCategory;
	productStatus: ProductStatus;
	productWeight: ProductWeight;
	productTitle: string;
	productPrice: number;
	productOldPrice: number;
	productViews: number;
	productLikes: number;
	productComments: number;
	productRank: number;
	productImages: string[];
	productDesc?: string;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
}
