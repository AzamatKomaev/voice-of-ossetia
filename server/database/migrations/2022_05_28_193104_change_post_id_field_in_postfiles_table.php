<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangePostIdFieldInPostfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('postfiles', function (Blueprint $table) {
            $table->foreignId('post_id')
                ->change()
                ->foreign('post_id')
                ->references('id')
                ->on('posts')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('postfiles', function (Blueprint $table) {
            $table->foreign('post_id')->change()->foreignId('post_id');
        });
    }
}
