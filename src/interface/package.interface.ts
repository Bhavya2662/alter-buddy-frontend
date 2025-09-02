import { ICategoryProps } from "./category.interface";
import { IMentorProps } from "./mentor.interface";

export type IPackageType = "video" | "audio" | "chat";
export const Package: IPackageType[] = ["audio", "video", "chat"];

export interface IPackagesProps {
     categoryId: ICategoryProps | string;
     packageType: IPackageType;
     type?: IPackageType; // Added to support backend SessionPackage model
     packageName: string;
     description?: string;
     price: number;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
     mentorId: IMentorProps | string;
     status: boolean;
     subServices?: ISubPackagesProps[];
}

export interface ISubPackagesProps {
     _id?: string;
     title: string;
     price: number;
     time: string;
}
