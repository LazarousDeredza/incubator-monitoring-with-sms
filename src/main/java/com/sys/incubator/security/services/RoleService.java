//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.sys.incubator.security.services;

import com.sys.incubator.security.models.Role;
import com.sys.incubator.security.models.User;
import com.sys.incubator.security.repositories.RoleRepository;
import com.sys.incubator.security.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;

    public RoleService() {
    }

    public List<Role> findAll() {
        return this.roleRepository.findAll();
    }

    public Role findById(int id) {
        return (Role)this.roleRepository.findOne(id);
    }

    public void delete(int id) {
        this.roleRepository.delete(id);
    }

    public void save(Role role) {
        this.roleRepository.save(role);
    }

    public void assignUserRole(Integer userId, Integer roleId) {
        User user = (User)this.userRepository.findOne(userId);
        Role role = (Role)this.roleRepository.findOne(roleId);
        Set<Role> userRoles = user.getRoles();
        userRoles.add(role);
        user.setRoles(userRoles);
        this.userRepository.save(user);
    }

    public void unassignUserRole(Integer userId, Integer roleId) {
        User user = (User)this.userRepository.findOne(userId) ;
        user.getRoles().removeIf((x) -> {
            return x.getId() == roleId;
        });
        this.userRepository.save(user);
    }

    public Set<Role> getUserRoles(User user) {
        return user.getRoles();
    }

    public Set<Role> geUserRoles(User user) {
        return user.getRoles();
    }

    public List<Role> getUserNotRoles(User user) {
        return this.roleRepository.getUserNotRoles(user.getId());
    }
}
