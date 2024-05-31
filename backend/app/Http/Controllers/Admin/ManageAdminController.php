<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddAdmin;
use App\Http\Resources\allAdmins;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Crypt;

class ManageAdminController extends Controller
{
    use ApiResponse;
    public function addAdmin(AddAdmin $addAdmin)
    {
        // $superAdmin = Admin::findOrfail(1);
        // $admin = new Admin;
        // if ($addAdmin->token == $superAdmin->token || ($addAdmin->token == "minOwner" && $addAdmin->role != "owner")) {
        //     $admin->email = $addAdmin->email;
        //     $admin->password = $addAdmin->password;
        //     $admin->name = $addAdmin->name;
        //     $admin->role = $addAdmin->role;
        //     $admin->token = $addAdmin->role == "owner" ? "minOwner" : "nothing";
        //     $admin->save();
        //     return $this->JsonResponse(201, "An admin has beed added", $admin);
        // } else
        //     return $this->JsonResponse(403, "An admin has beed added", $admin);
        $admin = new Admin;
        $admin->email = Crypt::encryptString($addAdmin->email);
        $admin->password = $addAdmin->password;
        $admin->name = Crypt::encryptString($addAdmin->name);
        $admin->role = $addAdmin->role;
        $saved = $admin->save();
        if ($saved)
            return $this->JsonResponse(201, 'Admin Created Successfully');
        return $this->JsonResponse(500, 'Error has been ocurred');
    }
    public function allAdmins()
    {
        $admins = Admin::where('id', '!=', 1)->get();
        return $this->JsonResponse(200, "All admins", allAdmins::collection($admins));
    }
    public function deleteAdmin(Request $request)
    {
        $admin = Admin::findorfail($request->id);
        $superAdmin = Admin::findOrfail(1);
        if ($request->token == $superAdmin->token) {
            Admin::destroy($admin->id);
            return $this->JsonResponse(200, "");
        } else if ($request->token == "minOwner" && $admin->role != 'owner') {
            Admin::destroy($admin->id);
            return $this->JsonResponse(200, "");
        } else {
            return
                $this->JsonResponse(403, "");
        }
    }
    public function updateData(Request $request)
    {
        $admin = Admin::where('email', '=', $request->email)->first();
        $admin->name = $request->name;
        $admin->password = $request->password;
        $saved = $admin->save();
        if ($saved) {
            return $this->JsonResponse(201, 'Updated');
        } else {
            return $this->JsonResponse(500, 'Error has been occured');
        }
    }
}
