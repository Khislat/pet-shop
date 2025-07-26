import {
	ProductCategory,
	ProductStatus,
	ProductWeight,
} from "../../enums/product.enum";
import { Direction } from "../../enums/common.enum";

export interface ProductInput {
	productCategory: ProductCategory;
	productWeight: ProductWeight;
	productTitle: string;
	productPrice: number;
	productOldPrice: number;
	productImages: string[];
	productDesc?: string;
	memberId?: string;
	constructedAt?: Date;
}

interface PISearch {
	memberId?: string;
	typeList?: ProductCategory[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	text?: string;
}

export interface ProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface VPISearch {
	productStatus?: ProductStatus;
}

export interface VendorProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: VPISearch;
}

interface ALPISearch {
	productStatus?: ProductStatus;
}

export interface AllProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
