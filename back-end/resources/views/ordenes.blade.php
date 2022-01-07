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
                <div class="card-header">{{ __('Fondeo') }}</div>

                <div class="card-body">                    
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                            <th scope="col"># Orden</th>
                            <th scope="col"># Prestamo</th>
                            <th scope="col">Monto</th>
                            <th scope="col">Estatus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>300</td>
                                <td>$ 500.00</td>
                                <td class="text-success">Al Corriente</td>
                            </tr>

                            <tr>
                                <th scope="row">2</th>
                                <td>300</td>
                                <td>$ 500.00</td>
                                <td class="text-danger">Error (Sin fondos)</td>
                            </tr>

                            
                            
                        </tbody>
                    </table>
                    
            </div>
        </div>
    </div>
</div>
@endsection
