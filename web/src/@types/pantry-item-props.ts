export type PantryItemProps = {
    id: number;
    isOffline: boolean;
    amount: number;

    offlineProductId?: number;
    productId?: number;

    userId: number;
};
