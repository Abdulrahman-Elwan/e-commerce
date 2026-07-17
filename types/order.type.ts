export interface Order {
    _id: string;
    id: number;
    createdAt: string;
    isPaid: boolean;
    isDelivered: boolean;
    totalOrderPrice: number;
    paymentMethodType: string;
    shippingAddress: {
        city: string;
        details: string;
        phone: string;
    };
    cartItems: {
        _id: string;
        count: number;
        price: number;
        product: {
            title: string;
            imageCover: string;
        };
    }[];
}