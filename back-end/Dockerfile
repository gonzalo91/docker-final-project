FROM composer:2.2.3 as vendor
WORKDIR /packages
COPY composer.json composer.lock /packages/
RUN composer install \
    --ignore-platform-reqs \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --prefer-dist


FROM php:8.1-fpm
WORKDIR /var/www/back-end

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    libzip-dev \
    libonig-dev \
    curl

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd

# Install composer
#RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

RUN mkdir -p /var/www/back-end/vendor
RUN chown www /var/www/back-end/vendor

# Change current user to www
USER www

# Copy existing application directory contents
COPY . /var/www/back-end

# Copy existing application directory permissions
COPY --chown=www:www . /var/www/back-end

COPY --from=vendor /packages/vendor /var/www/back-end/vendor

RUN php artisan optimize:clear

EXPOSE 9000




