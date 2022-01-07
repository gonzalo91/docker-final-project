@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">

            <div class="row">
                <div class="col-4">
                    <div>
                        <span class="h4">Tu Saldo: </span> $ <div class="d-inline" id="balance"></div>
                    </div>
                </div>

                <div class="col-8">
                    <a href="{{ route('orders') }}" type="button" class="btn btn-primary mb-3 float-end">                
                        Mis Ordenes
                        <i class="fas fa-pager ms-2"></i>
                    </a>
                </div>
            </div>            

            <div class="card">
                <div class="card-header">{{ __('Fondeo') }}</div>

                <div class="card-body">
                    
                    <div id="list-loans"></div>
                                        
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
