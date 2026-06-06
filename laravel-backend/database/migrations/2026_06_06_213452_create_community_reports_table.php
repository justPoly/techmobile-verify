<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('community_reports', function (Blueprint $table) {
            $table->id();
            $table->string('brand');
            $table->string('phone_model');
            $table->string('device_status');
            $table->string('full_name');
            $table->string('email');
            $table->string('phone_source')->nullable();
            $table->text('additional_info')->nullable();
            $table->string('photo1')->nullable();
            $table->string('photo2')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('reviewed_by')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('community_reports');
    }
};