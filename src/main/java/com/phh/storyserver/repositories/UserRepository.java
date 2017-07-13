package com.phh.storyserver.repositories;

import com.phh.storyserver.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by phhien on 11/25/2016.
 */
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByCode(String code);
}
