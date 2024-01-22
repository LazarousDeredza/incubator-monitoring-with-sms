package com.sys.incubator.Respository;

import com.sys.incubator.Entity.Incubator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncubatorRepository extends JpaRepository<Incubator,Long> {


    Incubator findDistinctFirstByPhone(String phone);
}
