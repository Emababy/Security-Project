<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    public function arabic_product(): HasOne
    {
        return $this->hasOne(ArabicProduct::class);
    }
}
