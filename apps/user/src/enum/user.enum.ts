export enum USER_STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'In-Active',
}

export enum DatabaseCounterEnum {
  USER = 'User',
  CLIENT = 'Client',
}

export enum DepositStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded',
}

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
}

export enum RequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum UserCurrentStatus {
  CHECKED_IN = 'checked_in',
  ON_LEAVE = 'on_leave',
  CHECKED_OUT = 'checked_out',
}

export enum UserType {
  STUDENT = 'student',
  WORKER = 'worker',
  DAILY_RENT = 'dailyRent',
  MESS_ONLY = 'messOnly',
}

export enum RentType {
  MONTHLY = 'monthly',
  DAILY = 'daily',
  MESS = 'mess',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
}
