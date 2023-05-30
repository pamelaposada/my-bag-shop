# My Bag Shop

## Project Description

Small shopping cart project about a handbag's shop business. The project has been created using MERN stack (MongoDB, Express, React, and Node) and deployed on an EC2 by using Nginx server.

## Project Features

Users can:

<ul>
    <li>Select and unselect products</li>
    <li>Diplay the total amount of their purchase</li>
    <li>Delete products from the cart</li>
    <li>Create an account and Login</li>
    <li>Search products</li>
    <li>Sort products by price</li>
    <li>Filter products by category</li>
</ul>

## Programming Languages

<ul>
    <li>JavaScript</li>
    <li>CSS</li>
    <li>HTML</li>
</ul>

## Frameworks

<ul>
    <li>ReactJS</li>
</ul>

## Libraries

### Front-end

<ul>
    <li>Create react app</li>
    <li>Axios</li>
    <li>Express session</li>
    <li>React router</li>
    <li>Session file store</li>
</ul>

### Back-end

<ul>
    <li>Express</li>
    <li>Cors</li>
    <li>Express session</li>
    <li>Mongoose</li>
</ul>

### Testing

<ul>
    <li>Postman</li>
    <li>MorganBody</li>
    <li>test.http</li>
</ul>

## Deployment

<ul>
    <li>EC2</li>
    <li>Ubuntu</li>
    <li>Nginx</li>
</ul>

### Deployment steps

1. Deploy an AWS EC2 Ubuntu Server 22.04 LTS
2. Security group configuration
<ul>
    <li>Allow ssh on port 22</li>
    <li>Allow http on port 80</li>
    <li>Allow Node server on port 4000</li>
    <li>Allow Mongodb on port 27017</li>
</ul>

3. sudo apt-get update
4. Install Node from NVM

   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

   . ~/.nvm/nvm.sh

   nvm install --lts

   node --version

5. Install Nginx

   sudo apt install nginx

6. Configure Nginx

   mkdir /home/ubuntu/client/deploy/

   mkdir /home/ubuntu/client/server_logs/

   cd /home/ubuntu/client/server_logs/

   touch host.access.log api.access.log

   cd /etc/nginx/conf.d/

   touch default.conf

   sudo nano /etc/nginx/nginx.conf

---

    user ubuntu;
    worker_processes 1;

    error_log /var/log/nginx/error.log warn;
    pid /var/run/nginx.pid;

    events {
    worker_connections 1024;
    }

    http {

        include       /etc/nginx/mime.types;
        include    /etc/nginx/fastcgi.conf;
        default_type  application/octet-stream;

        log_format  kv      'site="$server_name" server="$host" dest_port="$server_port" dest_ip="$server_addr" '
                            'time_local="$time_local" protocol="$server_protocol" status="$status" '
                            'bytes_out="$bytes_sent" bytes_in="$upstream_bytes_received" '
                            'http_referer="$http_referer" http_user_agent="$http_user_agent" '
                            'nginx_version="$nginx_version" http_x_forwarded_for="$http_x_forwarded_for" '
                            'http_x_header="$http_x_header" uri_query="$query_string" uri_path="$uri" '
                            'http_method="$request_method" response_time="$upstream_response_time" '
                            'cookie="$http_cookie" request_time="$request_time" category="$sent_http_content_type" https="$https"';

        log_format post_logs ' $request_body ';


        access_log  /var/log/nginx/access.log  kv;

        sendfile        on;
        tcp_nopush     on;
        tcp_nodelay         on;

        client_body_buffer_size 100k;
        client_header_buffer_size 1k;
        client_max_body_size 100k;
        large_client_header_buffers 2 1k;
        client_body_timeout 10;
        client_header_timeout 10;
        keepalive_timeout 5 5;
        send_timeout 10;
        server_tokens off;
        #gzip  on; on;


        include /etc/nginx/conf.d/*.conf;

    }

---

    sudo nano /etc/nginx/conf.d/default.conf

---

    server {
    #listen 80;
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name 3.104.94.141;
    index index.html;
    access_log /home/ubuntu/client/server_logs/host.access.log kv;

        location / {
            try_files $uri $uri/ =404;
        }


        location / {
            access_log /home/ubuntu/client/server_logs/host.access.log kv;
            root   /home/ubuntu/client/deploy;
            index  index.html index.htm;
            try_files $uri /index.html;
            default_type text/html;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header X-Frame-Options SAMEORIGIN;
            add_header X-Content-Type-Options nosniff;
            add_header X-XSS-Protection "1; mode=block";
            add_header Strict-Transport-Security "max-age=31536000; includeSubdoma>
        }

        location /app/ {
            proxy_pass http://127.0.0.1:4000/;
            access_log /home/ubuntu/client/server_logs/post.access.log kv;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, DELETE';
            add_header X-Frame-Options SAMEORIGIN;
            add_header X-Content-Type-Options nosniff;
            add_header X-XSS-Protection "1; mode=block";
            add_header Strict-Transport-Security "max-age=31536000; includeSubdoma>
            proxy_http_version 1.1;
            proxy_set_header Connection '';
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-NginX-Proxy true;
            proxy_redirect off;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }

            server_tokens off;

        location ~ /\.ht {
            deny  all;
        }

    }

---

7. Clone repository in server
8. Front-end

   cd /my-bag-shop/
   
   npm i
   
   change local host for server ip
   
   npm run build
   
   copy build folder files into /client/deploy/

9. Backend

   delete node_modules and package-lock.json
   
   npm i
   
   change cors settings to server ip
   
   create backend .env file with Mongodb credentials

10. Production

    Install pm2 globally:

    npm i pm2 -g

    Go to backend folder:

    pm2 start npm --name "api" -- start
