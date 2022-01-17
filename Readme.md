docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up





## Events - worker -> websockets
| Event | Name            | Params                              |
|-------|-----------------|-------------------------------------|
| #1    | loan_funded     | { 'loan_id' }                       |
| #2    | order_processed | { 'order_id', 'status', 'user_id' } |