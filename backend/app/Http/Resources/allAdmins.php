<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Crypt;

class allAdmins extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => Crypt::decryptString($this->name),
            'email' => Crypt::decryptString($this->email),
            'password' => $this->password,
            'role' => $this->role,
            'id' => $this->id
        ];
    }
}
