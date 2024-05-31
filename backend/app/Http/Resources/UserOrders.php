<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Crypt;

class UserOrders extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'order_id' => $this->id,
            'order_details' => json_decode(Crypt::decryptString($this->order_details)),
            'price' => Crypt::decryptString($this->total_price),
            'status' => $this->status,
            'ordered_at' => $this->ordered_at,
        ];
    }
}
