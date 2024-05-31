<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddProductRequest;
use App\Http\Resources\AllProductsResource;
use App\Http\Resources\ProductsResource;
use App\Http\Resources\ShowProduct;
use App\Models\Category;
use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use ApiResponse;
    public function store(AddProductRequest $addProductRequest)
    {
        /*Add English Product*/
        $product = new Product;
        $product->category_id = $addProductRequest->input('category_id');
        $product->title = $addProductRequest->input('title');
        $product->description = $addProductRequest->input('description');
        $product->discount = $addProductRequest->input('discount');
        $product->stock = $addProductRequest->input('stock');
        $product->image = $addProductRequest->input('images');
        $product->color = $addProductRequest->input('color');
        $product->size = $addProductRequest->input('size');
        $price =  $addProductRequest->input('price');
        $product->price = $price;
        $EnglishAdded = $product->save();
        if ($EnglishAdded) {
            return $this->JsonResponse(201, 'Added successfully', $product);
        } else {
            return $this->JsonResponse(500, 'Error');
        }
    }
    public function getCategoriesWithProducts()
    {
        $categories = Category::with('products')->get();
        $category = ProductsResource::collection($categories);
        return $this->JsonResponse(200, 'Here are the products', $category);
    }
    public function showProductWithCategory($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product = new ShowProduct($product);
            return $this->JsonResponse(200, 'The product is here', $product);
        } else {
            return $this->JsonResponse(404, 'Not found');
        }
    }
    public function updateProduct(Request $addProductRequest)
    {
        /**English Product*/
        $product = Product::find($addProductRequest->id);
        $product->title = $addProductRequest->input('title');
        $product->description = $addProductRequest->input('description');
        $product->discount = $addProductRequest->input('discount');
        $product->stock = $addProductRequest->input('stock');
        $product->image = $addProductRequest->input('images');
        $product->color = $addProductRequest->input('color');
        $product->size = $addProductRequest->input('size');
        $price =  $addProductRequest->input('price');
        $product->price = $price;
        $EnglishUpdated = $product->save();
        if ($EnglishUpdated) {
            return $this->JsonResponse(201, 'Updated successfully', $product);
        } else {
            return $this->JsonResponse(500, 'Error');
        }
    }
    public function deleteProduct(Request $request)
    {
        $product = Product::find($request->id);
        $deleted = Product::destroy($request->id);
        if ($deleted) {
            return $this->JsonResponse(200, 'Deleted success fully');
        } else {
            return $this->JsonResponse(500, 'Something went wrong', $deleted);
        }
    }
    public function allProducts()
    {
        $products = Product::all();
        $all_products = AllProductsResource::collection($products);
        return $this->JsonResponse(200, 'All Products are here', $all_products);
    }
}