import { ICategoryProps } from "./category.interface";

interface IMentorNameProps {
  firstName: string;
  lastName: string;
}

interface IMentorContactProps {
  email: string;
  mobile: string;
  address: string;
}

export interface IMentorAuthProps {
  username: string;
  password: string;
}

interface IMentorAccountStatus {
  verification: boolean;
  block: boolean;
  online: boolean;
}

export interface IMentorProps {
  name: IMentorNameProps;
  contact: IMentorContactProps;
  auth: IMentorAuthProps;
  category: ICategoryProps[] | string[];
  specialists: string[];
  accountStatus: IMentorAccountStatus;
  acType: "MENTOR";
  inCall?: boolean;
  isUnavailable?: boolean;
  videoLink?: string;
  description?: string;
  image: string;
  languages: string[];
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  qualification: string;
  maxSlotTime:number;
}

export interface ITopMentorProps {
  mentorId: IMentorProps;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  active: boolean;
}
