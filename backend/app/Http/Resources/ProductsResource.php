<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

use function PHPSTORM_META\map;

class ProductsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'category_name' => $this->title,
            'status' => $this->status,
            'category_id' => $this->id,
            'products' => $this->products->map(function ($product) {
                return [
                    'product_id' => $product->id,
                    'category_id' => $this->id,
                    'product_name' => $product->title,
                    'description' => $product->description,
                    'discount' => json_decode($product->discount),
                    'stock' => $product->stock,
                    'images' => json_decode($product->image),
                    'price' => json_decode($product->price),
                ];
            }),
        ];
    }
}