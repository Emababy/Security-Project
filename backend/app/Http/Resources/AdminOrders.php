<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Crypt;

class AdminOrders extends JsonResource
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
            'user' =>  Crypt::decryptString($this->user_data),
            'details' => json_decode(Crypt::decryptString($this->order_details)),
            'price' => Crypt::decryptString($this->total_price),
            'paid_method' => $this->paid,
            'promocode' => $this->promocode,
            'ordered_at' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s')
        ];
    }
}
