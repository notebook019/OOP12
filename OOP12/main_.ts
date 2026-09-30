import { UserDAO } from "./UserDAO";

const userDAO = new UserDAO();

userDAO.insert("supakit", "sumone@email.com");
userDAO.insert("supakit1", "sumone1@email.com");
userDAO.insert("supakit2", "sumone2@email.com");

const users = userDAO.findAll();
users.forEach(u =>{
    console.log(u.getinfo());
});