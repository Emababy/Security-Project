<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserOrders;
use App\Models\AdminOrder;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Crypt;

class OrderController extends Controller
{
    use ApiResponse;
    public function allOrders()
    {
        $user = User::find(auth('user')->user()->id);
        $orders = UserOrders::collection($user->orders);
        return $this->JsonResponse(200, 'User orders', $orders);
    }
    public function makeOrder(Request $request)
    {
        /*Admin order*/
        $user_data = 'name:' . $request->name . '<br>' . 'email:' . $request->email . '<br>' . 'phone:' . $request->phone . '<br>' . 'location:' . $request->address . '<br>' . 'Governate:' . $request->governorate;
        $adminOrder = new AdminOrder;
        $adminOrder->user_data = Crypt::encryptString($user_data);
        $adminOrder->order_details = Crypt::encryptString($request->order_details);
        $adminOrder->total_price = Crypt::encryptString($request->total_price);
        $adminOrder->promocode = $request->has('promocode') ? $request->promocode : 'nothing';
        $adminOrder->paid = $request->paid_method;
        $adminOrder->payment_details = $request->has('order_id') ? $request->order_id : 'nothing';
        $adminOrders = $adminOrder->save();

        // $products = $request->products;
        // foreach ($products as $product) {
        //     $product_id = $product['product_id'];
        //     $product_data = Product::find($product_id);
        //     $product_data->stock = ($product_data->stock) - ($product['amount']);
        //     $product_data->save();
        // }

        /*User Order*/
        $user = User::find(auth('user')->user()->id);
        $user_id = $user->id;
        $user_data = 'name:' . $user->name . '<br>' . 'email:' . $user->email . '<br>' . 'phone:' . $user->phone . '<br>' . 'location:' . $user->address;
        $order = new Order;
        $order->user_id = $user_id;
        $order->order_id = $adminOrder->id;
        $order->order_details = Crypt::encryptString($request->order_details);
        $order->total_price = Crypt::encryptString($request->total_price);
        $order->paid = $request->paid_method;
        $order->promocode = $request->has('promocode') ? $request->promocode : 'nothing';
        $UserOrdered = $order->save();

        // if ($adminOrders && $UserOrdered) {
        //     $adminOrder->order_details = json_decode($adminOrder->order_details);
        //     $order = $adminOrder;
        //     $pdf = Pdf::loadView('admin.order', compact('order'));
        //     return $pdf->download('order.pdf');
        // } else {
        //     return $this->JsonResponse(500, 'Somethin went wrong');
        // }
        return $this->JsonResponse(201, 'Order created successfully');
    }
}
