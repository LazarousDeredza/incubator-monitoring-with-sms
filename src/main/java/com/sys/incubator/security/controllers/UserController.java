//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.sys.incubator.security.controllers;

import com.sys.incubator.security.models.User;
import com.sys.incubator.security.services.RoleService;
import com.sys.incubator.security.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;

@Controller
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

    public UserController() {
    }

    @GetMapping({"/editProfile"})
    public String getUser() {
        return "userEdit";
    }

    @PostMapping({"/editProfileImage/{username}"})
    public RedirectView addNew(RedirectAttributes redir, @PathVariable String username, @RequestParam(required = true,value = "file") MultipartFile file) throws IOException {
        this.userService.setProfile(username, file);
        RedirectView redirectView = new RedirectView("/editProfile", true);
        return redirectView;
    }

    @GetMapping({"/security/users"})
    public String getAll(Model model) {
        model.addAttribute("users", this.userService.findAll());
        return "/users";
    }

    @GetMapping({"/security/user/{op}/{id}"})
    public String editUser(@PathVariable Integer id, @PathVariable String op, Model model) {
        User user = this.userService.findById(id);
        model.addAttribute("user", user);
        model.addAttribute("userRoles", this.roleService.getUserRoles(user));
        model.addAttribute("userNotRoles", this.roleService.getUserNotRoles(user));
        return "/security/user" + op;
    }

    @PostMapping({"/users/addNew"})
    public RedirectView addNew(User user, RedirectAttributes redir) {
        String status = this.userService.save(user);
        RedirectView redirectView = null;
        redir.addFlashAttribute("message", status);
        if (status == "Account Created Successful") {
            redirectView = new RedirectView("/login", true);
        } else {
            redirectView = new RedirectView("/register", true);
        }

        return redirectView;
    }
}
