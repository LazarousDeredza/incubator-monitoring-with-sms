package com.sys.incubator.Respository;

import com.sys.incubator.Entity.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessagesRepository extends JpaRepository<Messages,Long> {

}
