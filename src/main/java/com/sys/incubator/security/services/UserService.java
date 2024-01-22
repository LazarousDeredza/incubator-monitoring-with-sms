//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.sys.incubator.security.services;

import com.sys.incubator.security.models.User;
import com.sys.incubator.security.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;

    public UserService() {
    }

    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    public User findByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    public User findById(int id) {
        return (User)this.userRepository.findOne(id);
    }

    public void delete(int id) {
        this.userRepository.delete(id);
    }

    public String save(User user) {
        user.setPassword(this.encoder.encode(user.getPassword()));
        User user2 = this.userRepository.findByUsername(user.getUsername());
        String status = "";
        if (user2 != null) {
            status = "Username is already taken";
            System.out.println("Username is already taken");
        } else {
            this.userRepository.save(user);
            status = "Account Created Successful";
            System.out.println("Account Created Successful");
        }

        return status;
    }

    public void UpadateProfile(User user, String username) {
        User user2 = this.userRepository.findByUsername(username);
        String status = "";
        if (user2 != null) {
            user2.setEmail(user.getEmail());
            user2.setFirstname(user.getFirstname());
            user2.setUsername(user.getUsername());
            user2.setPhone(user.getPhone());
            user2.setLastname(user.getLastname());
            this.userRepository.save(user2);
            System.out.println("User Name : " + user.getUsername());
            System.out.println("First Name : " + user.getFirstname());
            System.out.println("Last Name : " + user.getLastname());
            System.out.println("Email   : " + user.getEmail());
            System.out.println("Profile Updated Successfully");
        } else {
            System.out.println("User not Found");
            throw new IllegalStateException("User not Found");
        }
    }

    public void setProfile(String username, MultipartFile file) throws IOException {
        User user = this.userRepository.findByUsername(username);
        if (user != null) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            String e = StringUtils.cleanPath(file.getContentType());
            String DocumentPath = System.getProperty("user.dir") + File.separator + "uploads" + File.separator + "Profiles";
            if (!Files.exists(Paths.get(DocumentPath), new LinkOption[0])) {
                Files.createDirectories(Paths.get(DocumentPath));
            }

            if (fileName.contains(" ")) {
                fileName = fileName.replace(" ", "_");
            }

            byte[] data = file.getBytes();
            Path path = Paths.get(DocumentPath + File.separator + fileName);
            Files.write(path, data, new LinkOption[0]);
            user.setPhoto(fileName);
            this.userRepository.save(user);
            System.out.println("Record saved : " + fileName);
            System.out.println("file extension : " + e);
        } else {
            throw new IllegalStateException(" User doesnt exist");
        }
    }
}
