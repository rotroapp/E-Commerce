import bycrpt from "bcryptjs";


const users = [
    {
        name: "Admin_1",
        email: "admin1@gmail.com",
        password: bycrpt.hashSync("admin123",10),
        isAdmin: true,
    },
    {
        name: "Jhon Wick",
        email: "jwick@gmail.com",
        password: bycrpt.hashSync("12345",10),
        isAdmin: false,
    },
    {
        name: "messi",
        email: "messi@gmail.com",
        password: bycrpt.hashSync("12345",10),
        isAdmin: false,
    }
]

export default users;