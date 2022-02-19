@extends('layouts.app')

@section('content')
<div class="container">
    <section class="vh-100" style="background-color: #9de2ff;">
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-md-9 col-lg-7 col-xl-5">
            <div class="card" style="border-radius: 15px;">
            <div class="card-body p-4">
                <div class="d-flex text-black">
                    <div id="profile" 
                        class="d-flex"
                        data-name="{{ $user_name }}" 
                        data-order_count="{{ $order_count }}"
                        data-order_route="{{ route('orders') }}"
                    >
                    </div>
                    
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
</div>
@endsection
