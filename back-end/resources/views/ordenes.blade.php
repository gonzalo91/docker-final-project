@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <a href="{{ route('home') }}" type="button" class="btn btn-primary mb-3">
                <i class="fas fa-arrow-left me-2"></i>
                Regresar a los prestamos
            </a>
            
            <div class="card">
                <div class="card-header">{{ __('Ordenes') }}</div>

                <div class="card-body">                                        
                    <div id="list-orders"></div>
                </div>
            </div>
    </div>
</div>
@endsection
