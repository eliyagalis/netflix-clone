
export interface IPayPalPlanResponse {
    id: string;
    product_id: string;
    name: string;
    status: string;
    description: string;
    billing_cycles: Array<{
      frequency: {
        interval_unit: string;
        interval_count: number;
      };
      pricing_scheme: {
        fixed_price: {
          value: string;
          currency_code: string;
        };
      };
      sequence: number;
      total_cycles: number;
    }>;
    payment_preferences: {
      auto_bill_outstanding: boolean;
      setup_fee: {
        value: string;
        currency_code: string;
      };
      payment_failure_threshold: number;
    };
    create_time: string;
    update_time: string;
  }
  
 export interface IPayPalSubscriptionResponse {
    id: string;
    status: string;
    plan_id: string;
    start_time: string;
    subscriber: {
      name: {
        given_name: string;
        // surname: string;
      };
      email_address: string;
    };
    links: Array<{
      href: string;
      rel: string;
      method: string;
    }>;
    create_time: string;
    update_time: string;
  }

  export interface IPayPalSubscriptionCancellationResponse {
    id: string;
    status: "CANCELLED" | "ACTIVE" | "SUSPENDED";
    reason?: string;
    start_time: string;  //ISO 8601 date string
    end_time: string;   
    billing_info: {
        payer: {
            name: {
                given_name: string;
                surname: string;
            };
            email_address: string;
        };
        plan_id: string;
    };
}