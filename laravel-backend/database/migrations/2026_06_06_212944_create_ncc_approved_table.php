<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('ncc_approved', function (Blueprint $table) {
            $table->id();
            $table->string('sn')->nullable();
            $table->string('applicant');
            $table->string('certificate_holder');
            $table->string('equipment_name');
            $table->string('models');
            $table->string('manufacturer');
            $table->timestamp('last_updated')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ncc_approved');
    }
};