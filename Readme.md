
## Live
https://prestamos.tk/

## Run it
To run this project you need to have installed docker and docker-compose 
Then execute
```sh
bash start-compose.sh
```
Connect to the **back-end** service and run migrations
```sh
php artisan migrate
php artisan link:storage
```
Also, you could create some dummy loans with the command
```sh
php artisan loan:create
```
And you are good to go.
Visit http://localhost, Sign up, and fund some orders! (We have given you a considerable amount of money in your balance ;)




## Description
This project is a multistack web app. It's purpose its to have a basic, but real-world app to demonstrate the use of docker, docker-compose, with different technologies, and how we could stablish a communication between them. Also it could be useful as a skeleton architecture for future projects which could have some similitudes of what we've done here.

## Project explanation
The project tries to simulate the flow of a loan funding process. Let's say you want to lend some money to someone, but you don't want to take the risk to put all your eggs in one basket, so you only lend a tiny amount of the real amount of the loan. So in this scenario, multiple persons have to participate to get this working.
Users or investors can see the available loans, submit and order and see if their orders have been accepted or rejected *(Laravel)*. A worker in the background process all this orders *(python worker)* and notifies through a message broker *(Redis)* to the web-socket service *(NodeJs)* which events has been triggered so it can emit them to the front-end *(React)*.

## Tecnologies
- Front-end:       **React**
- Back-end:        **PHP (Laravel)**
- BD:              **MySql**
- Message Broker:  **Redis**
- Web-socket:      **NodeJs (SocketIO and Express)**
- Worker:          **Python**
- Proxy:           **Nginx**


## Folder Structure
We have separeted the different projects in folders which reveal its main purpose.
Inside *python-worker*, we have the code in python which is responsible to process all the pending orders.
In *back-end* folder, we store the laravel application, as well as the skeleton configuration for a react front-end.
And in *web-socket* you may infiere what's been done there.


## Build

docker build -t zalollauri/loan.web-sockets:1.0.0 ./web-socket
docker push  zalollauri/loan.web-sockets:1.0.0

docker build -t zalollauri/loan-worker:1.1.1 ./python-worker
docker push  zalollauri/loan-worker:1.1.1

docker build -t zalollauri/loan-back-end:1.4.0 ./back-end
docker push  zalollauri/loan-back-end:1.4.0

docker build -t zalollauri/loan.proxy:1.0.0 -f ProxyDockerfile .;
docker push  zalollauri/loan.proxy:1.0.0



##  Deploy

Check deploy.txt


## Events - worker -> websockets
| Event | Name            | Params                              |
|-------|-----------------|-------------------------------------|
| #1    | loan_funded     | { 'loan_id' }                       |
| #2    | order_processed | { 'order_id', 'status', 'user_id' } |