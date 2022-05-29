<?php

namespace App\Providers;

use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Pluralizer;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        PostResource::withoutWrapping();
    }
}
