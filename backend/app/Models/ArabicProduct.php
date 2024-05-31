<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArabicProduct extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function arabic_category(): BelongsTo
    {
        return $this->belongsTo(ArabicCategory::class);
    }
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
