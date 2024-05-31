<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ShowProduct extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'product_id' => $this->id,
            'category_id' => $this->category->id,
            'product_name' => $this->title,
            'category_name' => $this->category->title,
            'description' => $this->description,
            'discount' => json_decode($this->discount),
            'stock' => $this->stock,
            'image' => json_decode($this->image),
            'size' => json_decode($this->size),
            'color' =>json_decode($this->color),
            'price' =>  json_decode($this->price, true),
        ];
    }
}