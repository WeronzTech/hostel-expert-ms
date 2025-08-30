export enum InventoryItemUnits {
  KILO = 'kg',
  GRAM = 'g',
  LITER = 'l',
  MILLILITER = 'ml',
}

export enum InventoryStatus {
  PENDING = 'pending',
  APPLIED = 'applied',
  CANCELLED = 'cancelled',
}

export enum InventoryLogOperation {
  ADD = 'add',
  REMOVE = 'remove',
  EDIT = 'edit',
  AUTO_APPLY_QUEUED = 'auto_apply_queued',
  PRICE_UPDATE_AND_ADD = 'price_update_and_add',
}

export enum InventoryLogEditedField {
  STOCK_QUANTITY = 'stockQuantity',
  LOW_STOCK_QUANTITY = 'lowStockQuantity',
  QUANTITY_TYPE = 'quantityType',
  OTHER = 'other',
  PRODUCT_NAME = 'productName',
  KITCHEN_ID = 'kitchenId',
  CATEGORY_ID = 'categoryId',
}
