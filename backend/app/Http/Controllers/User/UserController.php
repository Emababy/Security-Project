<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Controller;
use App\Http\Resources\ArabicProductsResource;
use App\Http\Resources\ShowArabicProductResource;
use App\Models\ArabicCategory;
use App\Models\ArabicProduct;
use App\Models\Message;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use ApiResponse;
    public function index()
    {
        $user = auth()->user();
        return $this->JsonResponse(200, 'Worked', $user);
    }
    public function allProducts(Request $request)
    {
        if ($request->lang == 'ar') {
            $categories = ArabicCategory::with('arabic_products')->get();
            $arabic_products = ArabicProductsResource::collection($categories);
            return $this->JsonResponse(200, 'المنتجات جاهزة', $arabic_products);
        }
        $product = new ProductController;
        return $product->getCategoriesWithProducts();
    }
    public function updateData(Request $request)
    {
        $user = User::find(auth()->user()->id);
        $user->name = $request->name;
        $user->address = $request->address;
        $user->phone = $request->phone;
        $updated = $user->save();
        $data['name'] = $user->name;
        $data['email'] = $user->email;
        $data['phone'] = $user->phone;
        $data['address'] = $user->address;
        if ($updated) {
            return $this->JsonResponse(201, 'Updated', $data);
        } else {
            return $this->JsonResponse(500, 'Error');
        }
    }
    public function showProduct(Request $request, $id)
    {
        if ($request->lang == 'ar') {
            $arabic_product = ArabicProduct::where('product_id', $id)->first();
            $arabic_product = new ShowArabicProductResource($arabic_product);
            return $this->JsonResponse(200, 'المنتج هنا', $arabic_product);
        } else {
            $product = new ProductController;
            $prodcut_data = $product->showProductWithCategory($id);
            return $prodcut_data;
        }
    }
    public function contactUs(Request $request)
    {
        $message = Message::create($request->all());
        return $this->JsonResponse(201, 'Message Sent', $message);
    }
}
