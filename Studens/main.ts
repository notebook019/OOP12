import { sutdentDAO } from "./StudentDAO";

const Students = new sutdentDAO();

Students.insert(1, "684245019", "supakit", 1.23);
Students.insert(2, "684245018", "supakit1", 4.00);
Students.insert(3, "684245017", "supakit2", 1.25);
Students.insert(4, "684245016", "supakit3", 1.26);

const studens = Students.findAll();
let honor :string;
studens.forEach(u =>{
    if(u.isHonors() === true) honor = "เกียรตินียม";
    else honor = "";

    console.log(`${u.getid()} ${u.getstudencode()} ${u.getfullname()} ${u.getegpa()} ${honor}`);
});