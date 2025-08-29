import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  Gender,
  EmployeeStatus,
  PreferredPaymentMethod,
  SalaryStatus,
} from '../enum/employee.enum';

@Schema({ _id: false })
export class BankAccountDetails {
  @Prop({ type: String, required: false })
  accountHolderName: string;

  @Prop({ type: String, required: false })
  accountNumber: number;

  @Prop({ type: String, required: false })
  ifscCode: string;

  @Prop({ type: String, required: false })
  bankName: string;

  @Prop({ type: String, required: false })
  branchName: string;
}

export const BankAccountDetailsSchema =
  SchemaFactory.createForClass(BankAccountDetails);

@Schema({ _id: false })
export class UpiDetails {
  @Prop({ type: String, required: true })
  upiId: string;

  @Prop({ type: String, required: false })
  upiApp: string; // e.g., Google Pay, PhonePe, Paytm
}

export const UpiDetailsSchema = SchemaFactory.createForClass(UpiDetails);

@Schema({ _id: false })
export class AccountDetails {
  @Prop({ type: BankAccountDetailsSchema, required: false })
  bankAccount: BankAccountDetails;

  @Prop({ type: UpiDetailsSchema, required: false })
  upi: UpiDetails;

  @Prop({
    type: String,
    required: false,
    enum: PreferredPaymentMethod,
    default: PreferredPaymentMethod.BANK_ACCOUNT,
  })
  preferredPaymentMethod: PreferredPaymentMethod;
}

export const AccountDetailsSchema =
  SchemaFactory.createForClass(AccountDetails);

@Schema({ _id: false })
export class FinancialDetails {
  @Prop({ type: Number, required: true, default: 0 })
  monthlySalary: number;

  @Prop({ type: Number, required: true, default: 0 })
  pendingSalary: number;

  @Prop({ type: Number, required: true, default: 0 })
  advanceSalary: number;

  @Prop({ type: Date, required: false })
  nextSalaryDueDate: Date;
}

export const FinancialDetailsSchema =
  SchemaFactory.createForClass(FinancialDetails);

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ type: String, unique: true })
  employeeId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  contactNumber: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  role: mongoose.Types.ObjectId;

  @Prop({ type: Date, required: true, default: Date.now })
  joinDate: Date;

  @Prop({
    type: String,
    required: true,
    enum: EmployeeStatus,
    default: EmployeeStatus.ACTIVE,
  })
  EmployeeStatus: EmployeeStatus;

  @Prop({
    type: String,
    required: true,
    enum: SalaryStatus,
    default: SalaryStatus.PENDING,
  })
  SalaryStatus: SalaryStatus;

  @Prop({
    type: String,
    required: false,
    enum: Gender,
  })
  gender: Gender;

  @Prop({ type: String, required: false })
  address: string;

  @Prop({ type: Number, required: true })
  salary: number;

  @Prop({ type: String, required: false })
  profilePhoto: string;

  @Prop({ type: String, required: true })
  aadhaarFrontImage: string;

  @Prop({ type: String, required: true })
  aadhaarBackImage: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
    default: [],
  })
  propertyId: mongoose.Types.ObjectId[];

  @Prop({ type: AccountDetailsSchema, required: false })
  accountDetails: AccountDetails;

  @Prop({ type: FinancialDetailsSchema, required: false })
  financialDetails: FinancialDetails;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Boolean, default: false })
  loginEnabled: boolean;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: String, default: null })
  resetPasswordToken: string;

  @Prop({ type: Date, default: null })
  resetPasswordExpires: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
