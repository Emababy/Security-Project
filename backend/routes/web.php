<?php

use App\Http\Controllers\Admin\AccessController;
use App\Http\Controllers\AuthController;
use App\Models\Admin;
use App\Models\AdminOrder;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Crypt;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('forbidden', function () {
    return view('403');
});
Route::get('token', [AccessController::class, 'token']);

Route::get('change password', function () {
    $admin = Admin::where('email', '=', 'admin@sleepstation.com')->first();
    $admin->email = 'admin@ecommerce.com';
    $admin->password = Hash::make('12345678');
    $saved = $admin->save();
    if ($saved) {
        echo "Done";
    } else {
        echo "Error";
    }
});

Route::get('pdf', function () {
    $order = AdminOrder::findorfail(3);
    $order->order_details = json_decode($order->order_details);
    $pdf = Pdf::loadView('admin.order', compact('order'));
    return $pdf->download('order.pdf');
});

Route::get('create_super_admin', function () {
    $admin = Admin::create([
        'name' => 'e-commerce',
        'email' => 'admin@ecommerce.com',
        'password' => '12345678',
        'role' => 'super_admin'
    ]);
    return $admin ? 'Admin Created_successfully' : 'Error has been occurred';
});

Route::get('encrypt', function () {
    $name = Crypt::encryptString("e-commerce");
    $email = Crypt::encryptString("admin@ecommerce.com");
    return response()->json([
        'email' => $email,
        'name' => $name,
    ]);
});
