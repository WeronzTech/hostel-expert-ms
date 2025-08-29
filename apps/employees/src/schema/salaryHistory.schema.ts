import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { SalaryStatus } from '../enum/employee.enum';

@Schema({ timestamps: true })
export class SalaryHistory extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  })
  staffId: mongoose.Types.ObjectId;

  @Prop({ type: Number, required: true })
  salary: number;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Number, required: false })
  salaryCut: number;

  @Prop({ type: Number, required: false })
  salaryIncrement: number;

  @Prop({ type: Number, required: false })
  salaryPending: number;

  @Prop({ type: Number, required: false })
  advanceSalary: number;

  @Prop({
    type: String,
    required: true,
    enum: SalaryStatus,
    default: SalaryStatus.PENDING,
  })
  status: SalaryStatus;

  @Prop({ type: Number, required: false })
  paidAmount: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  paidBy: mongoose.Types.ObjectId;

  @Prop({ type: String, required: false })
  remarkType: string;
}

export const SalaryHistorySchema = SchemaFactory.createForClass(SalaryHistory);
