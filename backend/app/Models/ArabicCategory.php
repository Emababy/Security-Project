<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ArabicCategory extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function arabic_products(): HasMany
    {
        return $this->hasMany(ArabicProduct::class);
    }
}