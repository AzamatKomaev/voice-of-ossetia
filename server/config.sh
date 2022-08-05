#!/bin/bash
php artisan config:cache --env=$1
php artisan env
