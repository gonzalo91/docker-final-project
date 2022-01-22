#!/usr/bin/env bash

iteration=1
key=""
value=""

secrets=(
    "DB_HOST:db" 
    "DB_PASS:xxx" 
)

for secret in ${secrets[@]}; do    
    key=""
    value=""
    iteration=1

    splitted=$(echo $secret | tr ":" "\n")    

    for data in $splitted
    do          
        if [ $iteration -eq 1 ] 
        then        
            key=${data}
        fi 
        
        if [ $iteration -eq 2 ] 
        then
            value=$data
        fi     
        iteration=$((iteration+1))
    done

    if [[ -n $key && -n $value ]]
    then
        docker secret rm $key
        echo $value -n | docker secret create $key -        
    fi
    
done