package com.phh.storyserver.controllers;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import com.phh.storyserver.models.Service;
import com.phh.storyserver.models.User;
import com.phh.storyserver.repositories.ServiceRepository;
import com.phh.storyserver.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @Autowired
    UserRepository userRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> users() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public User get(final Integer id) {
        return userRepository.findOne(id);
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
    public User put(@RequestBody User user, final Integer id) {
        return userRepository.save(user);
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public List<Service> post(@RequestBody User user) {
        if(user.getServices() != null && user.getServices().size() > 0) {
            for(Service service : user.getServices()) {
                service.setUser(user);
            }
        }
        User userSaved = userRepository.save(user);
        List<Service> services = serviceRepository.findByUserId(userSaved.getUserId());
        for(Service service : services) {
            service.getUser().setServices(null);
        }
        return services;
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
    public void delete(final Integer id) {
        userRepository.delete(id);
    }

    @RequestMapping(value = "/services", method = RequestMethod.GET)
    public List<Service> services() {
        List<Service> services = serviceRepository.findAll();
        for(Service service : services) {
            service.getUser().setServices(null);
        }
        return services;
    }
}
