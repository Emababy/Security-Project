<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoriesResource;
use App\Models\Category;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{
    use ApiResponse;
    public function addCategory(CategoryRequest $categoryRequest)
    {
        Gate::authorize('manage_products');
        /*Add English Category*/
        $EnglishcCategory = new Category;
        $EnglishcCategory->title = $categoryRequest->title;
        $EnglishAdded = $EnglishcCategory->save();
        /*Response*/
        if ($EnglishAdded) {
            return $this->JsonResponse(201, 'Category Added', $EnglishcCategory);
        } else {
            return $this->JsonResponse(500, 'Addition failed');
        }
    }
    public function allCategories(Request $request)
    {
        $categories = Category::with('products')->get();
        return $this->JsonResponse(200, 'Here are the categories', CategoriesResource::collection($categories));
    }
    public function deleteCategory(Request $request)
    {
        $deleted = Category::destroy($request->id);
        if ($deleted) {
            return $this->JsonResponse(200, 'Category has been deleted');
        } else {
            return $this->JsonResponse(500, 'Error has been occured');
        }
    }
}
