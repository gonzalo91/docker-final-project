/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');


import 'izitoast/dist/css/iziToast.min.css';
import AppSockets from './app_sockets';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


require('./components/ListOrders');
require('./components/Balance');
require('./components/ListLoans');
require('./components/Profile');

const appSockets = new AppSockets()

appSockets.listen()