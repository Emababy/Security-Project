<?php

use App\Http\Controllers\Admin\AccessController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ContactUsController;
use App\Http\Controllers\Admin\ManageAdminController;
use App\Http\Controllers\Admin\OfferController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\User\OfferController as UserOfferController;
use App\Http\Controllers\User\OrderController;
use App\Http\Controllers\User\PaymobController;
use App\Http\Controllers\User\UserController as UserUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
########################/*Authorization for both user and admin*/##########################
Route::controller(AuthController::class)->group(function () {
    Route::post('admin_login', 'admin_login')/*->middleware('throttle:3,30')*/;
    Route::post('uesr_register', 'user_register');
    Route::post('user_login', 'user_login')/*->middleware('throttle:3,30')*/;
    Route::post('logout/user', 'logout');
    Route::post('logout/admin', 'adminLogout');
});

########################/*Admin Module*/##########################
Route::middleware('admin.loggedin')->group(function () {
    Route::prefix('admin')->group(function () {
        Route::controller(ContactUsController::class)->group(function () {
            Route::get('all_messages', 'allMessages');
            Route::post('delete_message', 'deleteMessage')->middleware('super_admin');
        });
        ##########/*Category Module*/##########
        ROute::controller(CategoryController::class)->group(function () {
            Route::post('add_category', 'addCategory')->middleware('super_admin');
            Route::get('all_categories', 'allCategories');
            Route::post('delete_category', 'deleteCategory')->middleware('super_admin');
        });
        ##########/*Product Module*/##########
        Route::controller(ProductController::class)->group(function () {
            Route::post('add_product', 'store')->middleware('super_admin');
            Route::get('all_products', 'allProducts');
            Route::get('show_product/{id}', 'showProductWithCategory');
            Route::post('update_product', 'updateProduct')->middleware('super_admin');
            Route::post('delete_product', 'deleteProduct')->middleware('super_admin');
        });
        Route::get('all_users', [UserController::class, 'allUsers'])->withoutMiddleware('admin.loggedin');
        #########/*Orders Module*/#########
        Route::controller(AdminOrderController::class)->group(function () {
            Route::get('cash_orders', 'cashOrders');
            Route::post('accept_order', 'acceptOrder');
            Route::post('reject_order', 'rejectOrder');
            Route::get('paid_orders', 'paidOrders');
        });
        #########/*Admins Module*/#########
        Route::controller(ManageAdminController::class)->group(function () {
            Route::post('add_admin', 'addAdmin');
            Route::get('all_admins', 'allAdmins');
            Route::post('delete_admin', 'deleteAdmin');
            Route::post('update_data', 'updateData');
        });
    });
});

########################/*User Module*/##########################
Route::prefix('user')->group(function () {
    ###################/*Paymob Module*/########################
    Route::controller(PaymobController::class)->group(function () {
        Route::get('state', 'responseCallback');
        Route::post('pay_details', 'payDetails');
    });
    ###############User Controller#################
    Route::controller(UserUserController::class)->group(function () {
        Route::get('home', 'index');
        Route::get('products', 'allProducts');
        Route::post('update', 'updateData')->middleware('user.loggedin');
        Route::post('Contact_Us', 'contactUs');
        Route::get('show_product/{id}', 'showProduct');
    });
    ###############Order Controller################
    Route::controller(OrderController::class)->group(function () {
        Route::get('all_orders', 'allOrders')->middleware('user.loggedin');
        Route::post('make_order', 'makeOrder')->middleware('user.loggedin');
    });
    ##############Offer Controller#################
    Route::controller(UserOfferController::class)->group(function () {
        Route::get('all_offers', 'allOffers');
    });
});
