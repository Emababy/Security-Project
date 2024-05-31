<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .receipt-container {
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .user-data {
            margin-bottom: 20px;
        }
        .order-details {
            margin-bottom: 20px;
        }
        .total-price {
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 10px;
        }
        .promocode{
            margin-bottom: 20px;
        }
        .order-id {
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <div class="order-id">
            Order ID: {{ $order->id }}
        </div>

        <div class="user-data">
            <h2>User Information</h2>
            {!! $order->user_data !!}
        </div>

        <div class="order-details">
            <h2>Order Details</h2>
            <ul>
                @foreach ($order->order_details as $detail)
                    <li>{{ $detail }}</li>
                @endforeach
            </ul>
        </div>

        <div class="total-price">
            <p>Total Price: ${{ $order->total_price }}</p>
        </div>

        <div class="promocode">
            <p>Promocode: {{ $order->promocode }}</p>
        </div>
    </div>
</body>
</html>
