<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Category extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
    public function arabic_category(): HasOne
    {
        return $this->hasOne(ArabicCategory::class);
    }
}
