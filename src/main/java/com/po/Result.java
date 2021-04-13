package com.po;


import com.google.gson.JsonObject;

public class Result {

    String status;
    String message;
    Object data;

    public Result(String status, String message, Object object) {
        this.status = status;
        this.message = message;
        this.data = object;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public Object getData() {
        return data;
    }

    public void setData(JsonObject data) {
        this.data = data;
    }
}
