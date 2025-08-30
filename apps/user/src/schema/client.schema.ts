import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CLIENT_STATUS, RAZORPAY_ACCOUNT_TYPE } from '../enum/client.enum';

@Schema({ _id: false })
export class Address {
  @Prop({ trim: true })
  street: string;

  @Prop({ trim: true })
  city: string;

  @Prop({ trim: true })
  state: string;

  @Prop({ trim: true })
  country: string;

  @Prop({ trim: true })
  zipCode: string;
}
export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ _id: false })
export class SmtpDetails {
  @Prop({ trim: true })
  email: string;

  @Prop({ trim: true })
  appPassword: string;
}
export const SmtpDetailsSchema = SchemaFactory.createForClass(SmtpDetails);

@Schema({ _id: false })
export class RazorpayDetails {
  @Prop({ trim: true })
  keyId: string;

  @Prop({ trim: true })
  keySecret: string;

  @Prop({ trim: true })
  merchantId: string;

  @Prop({ trim: true })
  webhook: string;

  @Prop({ type: String, enum: RAZORPAY_ACCOUNT_TYPE })
  accountType: string;

  @Prop({ trim: true })
  businessName: string;
}
export const RazorpayDetailsSchema =
  SchemaFactory.createForClass(RazorpayDetails);

@Schema({ _id: false })
export class AccountDetails {
  @Prop({ trim: true })
  accountNumber: string;

  @Prop({ trim: true })
  ifscCode: string;

  @Prop({ trim: true })
  upiId: string;

  @Prop({ trim: true })
  accountHolderName: string;
}
export const AccountDetailsSchema =
  SchemaFactory.createForClass(AccountDetails);

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true })
export class Client {
  @Prop({ type: String, unique: true })
  clientId: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ required: true, trim: true })
  contact: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  role: mongoose.Types.ObjectId;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false })
  loginEnabled: boolean;

  @Prop({ required: true, trim: true })
  companyName: string;

  @Prop({ trim: true })
  companyInfo: string;

  @Prop({ trim: true })
  gstNumber: string;

  @Prop({ type: String })
  logo: string;

  @Prop({ type: String })
  aadhaarPicture: string;

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop({ type: SmtpDetailsSchema })
  smtpDetails: SmtpDetails;

  @Prop({ type: RazorpayDetailsSchema })
  razorpayDetails: RazorpayDetails;

  @Prop({ type: AccountDetailsSchema })
  accountDetails: AccountDetails;

  @Prop({
    type: String,
    enum: CLIENT_STATUS,
    default: CLIENT_STATUS.PENDING,
  })
  status: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: null })
  resetPasswordToken: string;

  @Prop({ default: null })
  resetPasswordExpires: Date;

  @Prop({ default: null })
  emailVerificationToken: string;

  @Prop({ default: null })
  emailVerificationExpires: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
