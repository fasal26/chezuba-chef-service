interface IOrder {
    ORDER_ID: string;
    ITEMS: IOrderItem[];
    STATUS: 'Pending' | 'In-progress' | 'Completed';
  }
  interface IOrderItem {
    MENU_ID: string;
    QUANTITY: number;
    PREP_TIME: number;
    TYPE: 'Food' | 'Drink';
  }
export class Preperation{
  // calculate prep time for an order
    public async getFoodprepTime(order:IOrder){
      const pizzaCount = order.ITEMS.reduce((acc, item) => {
        if (item.TYPE === 'Food') {
          return acc + (item.PREP_TIME * item.QUANTITY);
        }
        return acc;
      }, 0);
      return pizzaCount
    }
}