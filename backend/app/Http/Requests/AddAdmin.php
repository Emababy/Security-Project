<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\ApiResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class AddAdmin extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    public function failedValidation(Validator $validator)
    {
        if ($this->is('api/*')) {
            $response = $this->JsonResponse(422, 'Validation Errors', $validator->errors());
            throw new ValidationException($validator, $response);
        }
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|unique:admins,email',
            'name' => 'required',
            'password' => 'required',
            'role' => 'required|in:super_admin,admin',
        ];
    }
    public function messages(): array
    {
        return [
            'email.required' => 'Email Fielad Is Required.',
            'Email.unique' => 'The Email Has Been Already Exist.',
            'Password.required' => 'The Password is required',
            'role.required' => 'The Role is required',
            'role.in' => 'The Role must be in these two values (super_admin,admin)',
        ];
    }
}
