<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderStatuses;
use App\Http\Requests\UploadImageProfileRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    
    public function index(Request $request){
        $user = $request->user();

        $orderCount = $user->orders()->where('status', OrderStatuses::Accepted)->count();

        $userData = [
            'user_name' => $user->name,
            'order_count' => $orderCount
        ];
        
        return view('profile', $userData);
        
    }

    public function image(Request $request){

        $user = $request->user();

        return [
            'image_profile' => $user->image_profile ?? asset('/img/user_default.png'),
        ];

    }

    public function updateImage(UploadImageProfileRequest $request){

        try{

            $file = Storage::putFile('public/image-profile', $request->file('image_profile'));
    
            $path = asset( Storage::url($file) );

            $user = $request->user();
            $user->image_profile = $path;
            $user->save();
                        
            return ['path' => $path];
        }catch(\Exception $e){
            Log::error($e);
            abort(500, 'Hubo un error en el servidor, intente de nuevo mas tarde');
        }
        
    }

}
