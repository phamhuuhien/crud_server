package com.phh.storyserver.repositories;

import com.phh.storyserver.models.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by phhien on 7/4/2017.
 */
public interface ServiceRepository extends JpaRepository<Service, Integer> {

    @Query(value = "select * from SERVICE where user_id = ?1", nativeQuery = true)
    List<Service> findByUserId(Integer userId);

}
