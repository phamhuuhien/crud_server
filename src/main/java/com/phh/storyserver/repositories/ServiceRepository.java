package com.phh.storyserver.repositories;

import com.phh.storyserver.models.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by phhien on 7/4/2017.
 */
public interface ServiceRepository extends JpaRepository<Service, Integer> {

    List<Service> findByUserId(String userId);

}
