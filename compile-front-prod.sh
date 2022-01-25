 npm run prod --prefix ./back-end

docker build -t zalollauri/loan.proxy:1.0.0 -f ProxyDockerfile .
docker push  zalollauri/loan.proxy:1.0.0