import { ObjectId } from "mongoose";

export class createProductCategoryDto {
    tenNH: string;
    idChaNH?: ObjectId;
    maNH?: number; 
}