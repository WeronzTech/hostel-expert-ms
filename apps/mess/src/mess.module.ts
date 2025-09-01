import { Module } from '@nestjs/common';
import { MessController } from './mess.controller';
import { MessService } from './mess.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import {
  DatabaseCounter,
  DatabaseCounterSchema,
} from './schema/databaseCounter.schema';
import { Inventory, InventorySchema } from './schema/inventory.schema';
import { InventoryLog, InventoryLogSchema } from './schema/inventoryLog.schema';
import { Kitchen, KitchenSchema } from './schema/kitchen.schema';
import { MealBooking, MealBookingSchema } from './schema/mealBooking.schema';
import { WeeklyMenu, WeeklyMenuSchema } from './schema/weeklyMenu.schema';
import {
  QueuedInventory,
  QueuedInventorySchema,
} from './schema/queuedInventory.schema';
import { Recipe, RecipeSchema } from './schema/recipe.schema';
import {
  RecipeCategory,
  RecipeCategorySchema,
} from './schema/recipeCategory.schema';
import {
  UsageForPreparation,
  UsageForPreparationSchema,
} from './schema/usageForPreparation.schema';
import { KitchenController } from './controllers/kitchen.controller';
import { KitchenService } from './services/kitchen.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MESS_MONGO_URL!),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: DatabaseCounter.name, schema: DatabaseCounterSchema },
      { name: Inventory.name, schema: InventorySchema },
      { name: InventoryLog.name, schema: InventoryLogSchema },
      { name: Kitchen.name, schema: KitchenSchema },
      { name: MealBooking.name, schema: MealBookingSchema },
      { name: WeeklyMenu.name, schema: WeeklyMenuSchema },
      { name: QueuedInventory.name, schema: QueuedInventorySchema },
      { name: Recipe.name, schema: RecipeSchema },
      { name: RecipeCategory.name, schema: RecipeCategorySchema },
      { name: UsageForPreparation.name, schema: UsageForPreparationSchema },
    ]),
  ],
  controllers: [MessController, KitchenController],
  providers: [MessService, KitchenService],
})
export class MessModule {}
