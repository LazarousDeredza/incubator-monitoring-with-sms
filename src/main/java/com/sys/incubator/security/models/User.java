//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.sys.incubator.security.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(
        name = "User"
)
public class User {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.IDENTITY,
            generator = "user_sequence"
    )
    private Integer Id;
    private String firstname;
    private String lastname;
    @Column(
            unique = true
    )
    private String username;
    private String password;
    private String photo;
    private String phone;
    private String email;
    @Transient
    private String newPass;
    @ManyToMany(
            cascade = {CascadeType.ALL},
            fetch = FetchType.EAGER
    )
    @JoinTable(
            name = "user_role",
            joinColumns = {@JoinColumn(
                    name = "user_id"
            )},
            inverseJoinColumns = {@JoinColumn(
                    name = "role_id"
            )}
    )
     Set<Role> roles = new HashSet();

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return this.firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return this.lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhoto() {
        return this.photo;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNewPass() {
        return this.newPass;
    }

    public void setNewPass(String newPass) {
        this.newPass = newPass;
    }

    public User(final Integer Id, final String firstname, final String lastname, final String username, final String password, final String photo, final String phone, final String email, final String newPass, final Set<Role> roles) {
        this.Id = Id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.photo = photo;
        this.phone = phone;
        this.email = email;
        this.newPass = newPass;
        this.roles = roles;
    }

    public User() {
    }

    public Integer getId() {
        return this.Id;
    }

    public Set<Role> getRoles() {
        return this.roles;
    }

    public void setId(final Integer Id) {
        this.Id = Id;
    }

    public void setRoles(final Set<Role> roles) {
        this.roles = roles;
    }

    public boolean equals(final Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof User)) {
            return false;
        } else {
            User other = (User)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                Object this$Id = this.getId();
                Object other$Id = other.getId();
                if (this$Id == null) {
                    if (other$Id != null) {
                        return false;
                    }
                } else if (!this$Id.equals(other$Id)) {
                    return false;
                }

                Object this$firstname = this.getFirstname();
                Object other$firstname = other.getFirstname();
                if (this$firstname == null) {
                    if (other$firstname != null) {
                        return false;
                    }
                } else if (!this$firstname.equals(other$firstname)) {
                    return false;
                }

                Object this$lastname = this.getLastname();
                Object other$lastname = other.getLastname();
                if (this$lastname == null) {
                    if (other$lastname != null) {
                        return false;
                    }
                } else if (!this$lastname.equals(other$lastname)) {
                    return false;
                }

                label110: {
                    Object this$username = this.getUsername();
                    Object other$username = other.getUsername();
                    if (this$username == null) {
                        if (other$username == null) {
                            break label110;
                        }
                    } else if (this$username.equals(other$username)) {
                        break label110;
                    }

                    return false;
                }

                label103: {
                    Object this$password = this.getPassword();
                    Object other$password = other.getPassword();
                    if (this$password == null) {
                        if (other$password == null) {
                            break label103;
                        }
                    } else if (this$password.equals(other$password)) {
                        break label103;
                    }

                    return false;
                }

                Object this$photo = this.getPhoto();
                Object other$photo = other.getPhoto();
                if (this$photo == null) {
                    if (other$photo != null) {
                        return false;
                    }
                } else if (!this$photo.equals(other$photo)) {
                    return false;
                }

                label89: {
                    Object this$phone = this.getPhone();
                    Object other$phone = other.getPhone();
                    if (this$phone == null) {
                        if (other$phone == null) {
                            break label89;
                        }
                    } else if (this$phone.equals(other$phone)) {
                        break label89;
                    }

                    return false;
                }

                label82: {
                    Object this$email = this.getEmail();
                    Object other$email = other.getEmail();
                    if (this$email == null) {
                        if (other$email == null) {
                            break label82;
                        }
                    } else if (this$email.equals(other$email)) {
                        break label82;
                    }

                    return false;
                }

                Object this$newPass = this.getNewPass();
                Object other$newPass = other.getNewPass();
                if (this$newPass == null) {
                    if (other$newPass != null) {
                        return false;
                    }
                } else if (!this$newPass.equals(other$newPass)) {
                    return false;
                }

                Object this$roles = this.getRoles();
                Object other$roles = other.getRoles();
                if (this$roles == null) {
                    if (other$roles != null) {
                        return false;
                    }
                } else if (!this$roles.equals(other$roles)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(final Object other) {
        return other instanceof User;
    }

    public int hashCode() {
        boolean PRIME = true;
        int result = 1;
        Object $Id = this.getId();
        result = result * 59 + ($Id == null ? 43 : $Id.hashCode());
        Object $firstname = this.getFirstname();
        result = result * 59 + ($firstname == null ? 43 : $firstname.hashCode());
        Object $lastname = this.getLastname();
        result = result * 59 + ($lastname == null ? 43 : $lastname.hashCode());
        Object $username = this.getUsername();
        result = result * 59 + ($username == null ? 43 : $username.hashCode());
        Object $password = this.getPassword();
        result = result * 59 + ($password == null ? 43 : $password.hashCode());
        Object $photo = this.getPhoto();
        result = result * 59 + ($photo == null ? 43 : $photo.hashCode());
        Object $phone = this.getPhone();
        result = result * 59 + ($phone == null ? 43 : $phone.hashCode());
        Object $email = this.getEmail();
        result = result * 59 + ($email == null ? 43 : $email.hashCode());
        Object $newPass = this.getNewPass();
        result = result * 59 + ($newPass == null ? 43 : $newPass.hashCode());
        Object $roles = this.getRoles();
        result = result * 59 + ($roles == null ? 43 : $roles.hashCode());
        return result;
    }

    public String toString() {
        return "User(Id=" + this.getId() + ", firstname=" + this.getFirstname() + ", lastname=" + this.getLastname() + ", username=" + this.getUsername() + ", password=" + this.getPassword() + ", photo=" + this.getPhoto() + ", phone=" + this.getPhone() + ", email=" + this.getEmail() + ", newPass=" + this.getNewPass() + ", roles=" + this.getRoles() + ")";
    }
}
