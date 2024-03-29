package com.service;

import com.google.gson.JsonObject;
import com.po.Result;
import com.util.firebaseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.*;

@Service
public class UserService {

    @Autowired
    private firebaseUtil firebaseUtil;


    public Result saveUser(String email, String password) {
        List<Map<String, Object>> data = firebaseUtil.getDataByField("users", "email", email);
        if (data.size() > 0) {
            return new Result("Please choose another email", "the email allready exists", null);
        }

        UUID uuid = UUID.randomUUID();
        Map<String, Object> saveData = new HashMap<>();
        saveData.put("id", uuid.toString());
        saveData.put("password", DigestUtils.md5DigestAsHex(password.getBytes()));
        saveData.put("email", email);
        saveData.put("createTime", new Date());
        Result result = firebaseUtil.saveDocument("users", uuid.toString(), saveData);
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id", uuid.toString());
        result.setData(jsonObject);
        return result;
    }

    public Result login(String email, String password) {
        List<Map<String, Object>> data = firebaseUtil.getDataByField("users", "email", email);
        if (data.size() <= 0) {
            return new Result("please register", "user not exsits", null);
        }

        Map<String, Object> user = data.get(0);
        String passwordMD5 = DigestUtils.md5DigestAsHex(password.getBytes());
        if (!passwordMD5.equals(user.get("password"))) {
            return new Result("Please re-enter email or password", "email or password is wrong", null);
        }
        return new Result("login successful", "", null);
    }
}
