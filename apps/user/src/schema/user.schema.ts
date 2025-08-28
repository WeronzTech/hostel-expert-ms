import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  DepositStatus,
  MealType,
  PaymentStatus,
  RentType,
  RequestStatus,
  UserCurrentStatus,
  UserType,
} from '../enum/user.enum';

@Schema({ _id: false })
export class PersonalDetails {
  @Prop() address: string;
  @Prop() dob: Date;
  @Prop() gender: string;
  @Prop() profileImg: string;
  @Prop() aadharFront: string;
  @Prop() aadharBack: string;
}
export const PersonalDetailsSchema =
  SchemaFactory.createForClass(PersonalDetails);

@Schema({ _id: false })
export class ParentsDetails {
  @Prop() name: string;
  @Prop() email: string;
  @Prop() contact: string;
  @Prop() occupation: string;
}
export const ParentsDetailsSchema =
  SchemaFactory.createForClass(ParentsDetails);

@Schema({ _id: false })
export class StudyDetails {
  @Prop() course: string;
  @Prop() yearOfStudy: string;
  @Prop() institution: string;
}
export const StudyDetailsSchema = SchemaFactory.createForClass(StudyDetails);

@Schema({ _id: false })
export class WorkingDetails {
  @Prop() jobTitle: string;
  @Prop() companyName: string;
  @Prop() location: string;
  @Prop() emergencyContact: string;
}
export const WorkingDetailsSchema =
  SchemaFactory.createForClass(WorkingDetails);

@Schema({ _id: false })
export class StayDetails {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  propertyId: mongoose.Types.ObjectId;
  @Prop() propertyName: string;
  @Prop() sharingType: string;
  @Prop() roomNumber: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  roomId: mongoose.Types.ObjectId;
  @Prop({ default: 0 }) depositAmountPaid: number;
  @Prop() nonRefundableDeposit: number;
  @Prop() refundableDeposit: number;
  @Prop({ enum: DepositStatus, default: DepositStatus.PENDING })
  depositStatus: string;
  @Prop() monthlyRent: number;
  @Prop({ default: Date.now }) joinDate: Date;
  @Prop() dailyRent: number;
  @Prop() checkInDate: Date;
  @Prop() checkOutDate: Date;
  @Prop() noOfDays: number;
  @Prop() extendedDays: number;
  @Prop() extendDate: Date;
}
export const StayDetailsSchema = SchemaFactory.createForClass(StayDetails);

@Schema({ _id: false })
export class MessDetails {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  kitchenId: mongoose.Types.ObjectId;
  @Prop() kitchenName: string;
  @Prop({ type: [String], enum: MealType })
  mealType: MealType[];
  @Prop() rent: number;
  @Prop() messStartDate: Date;
  @Prop() messEndDate: Date;
  @Prop() noOfDays: number;
  @Prop() extendedDays: number;
  @Prop() extendDate: Date;
}
export const MessDetailsSchema = SchemaFactory.createForClass(MessDetails);

@Schema({ _id: false })
export class FinancialDetails {
  @Prop({ default: 0 }) monthlyRent: number;
  @Prop({ default: 0 }) pendingRent: number;
  @Prop({ default: 0 }) accountBalance: number;
  @Prop() nextDueDate: Date;
  @Prop() paymentDueSince: Date;
  @Prop({ default: 0 }) totalAmount: number;
  @Prop({ default: 0 }) pendingAmount: number;
}
export const FinancialDetailsSchema =
  SchemaFactory.createForClass(FinancialDetails);

@Schema({ _id: false })
export class CurrentStatusRequest {
  @Prop({ enum: UserCurrentStatus }) type: string;
  @Prop({ enum: RequestStatus }) status: string;
}
export const CurrentStatusRequestSchema =
  SchemaFactory.createForClass(CurrentStatusRequest);

@Schema({ _id: false })
export class ReferralInfo {
  @Prop({ default: false }) isReferralProcessed: boolean;
  @Prop() referralLink: string;
  @Prop() referredByLink: string;
  @Prop({ type: String }) referredUsers: string;
  @Prop() lastUsed: Date;
  @Prop({ default: 1 }) level: number;
  @Prop({ default: 0 }) totalReferrals: number;
  @Prop({ default: 0 }) referralEarnings: number;
  @Prop({ default: 0 }) withdrawnAmount: number;
}
export const ReferralInfoSchema = SchemaFactory.createForClass(ReferralInfo);

@Schema({ _id: false })
export class RentReminder {
  @Prop({ default: null }) daysLeft: number;
  @Prop({ default: '' }) message: string;
}
export const RentReminderSchema = SchemaFactory.createForClass(RentReminder);

@Schema({ timestamps: true, discriminatorKey: 'userType' })
export class User extends Document {
  @Prop({ type: String, unique: true }) userId: string;
  @Prop({
    type: String,
    enum: UserType,
    required: true,
  })
  userType: string;
  @Prop({ type: String, enum: RentType, required: true })
  rentType: string;
  @Prop() name: string;
  @Prop() email: string;
  @Prop({ required: true }) contact: string;
  @Prop() password: string;
  @Prop({ type: PersonalDetailsSchema, default: {} })
  personalDetails: PersonalDetails;
  @Prop({ type: ParentsDetailsSchema, default: {} })
  parentsDetails: ParentsDetails;
  @Prop({ type: StudyDetailsSchema, default: {} }) studyDetails: StudyDetails;
  @Prop({ type: WorkingDetailsSchema, default: {} })
  workingDetails: WorkingDetails;
  @Prop({ type: StayDetailsSchema, default: {} }) stayDetails: StayDetails;
  @Prop({ type: MessDetailsSchema, default: {} }) messDetails: MessDetails;
  @Prop({ type: FinancialDetailsSchema, default: {} })
  financialDetails: FinancialDetails;
  @Prop({ type: String, default: PaymentStatus.PENDING, enum: PaymentStatus })
  paymentStatus: string;
  @Prop({
    type: String,
    enum: UserCurrentStatus,
    default: UserCurrentStatus.CHECKED_IN,
  })
  currentStatus: string;
  @Prop({ type: CurrentStatusRequestSchema, default: {} })
  currentStatusRequest: CurrentStatusRequest;
  @Prop({ type: ReferralInfoSchema, default: {} }) referralInfo: ReferralInfo;
  @Prop({ type: RentReminderSchema, default: {} }) rentReminder: RentReminder;
  @Prop({ default: false }) isApproved: boolean;
  @Prop({ default: false }) isVerified: boolean;
  @Prop({ default: false }) isLoginEnabled: boolean;
  @Prop({ default: false }) isBlocked: boolean;
  @Prop() isAccessBlockExtendDate: Date;
  @Prop({ default: false }) isVacated: boolean;
  @Prop({ default: false }) isHeavens: boolean;
  @Prop() vacatedAt: Date;
  @Prop({ required: true, default: 10 }) profileCompletion: number;
  @Prop() resetPasswordToken: string;
  @Prop() resetPasswordExpires: Date;
  @Prop() emailVerificationToken: string;
  @Prop() emailVerificationExpires: Date;
  @Prop() approvedBy: mongoose.Types.ObjectId[];
  @Prop() updatedBy: mongoose.Types.ObjectId;
  @Prop() notes: string;
  currentRent: number;
  calculateTotalDues: () => number;
}

export const UserSchema = SchemaFactory.createForClass(User);
