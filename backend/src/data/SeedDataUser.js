import mongoose from "mongoose";

dotenv.config({ path: "../.env" });
const uri = process.env.MONGODB_URL;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

const seedUser = [
  {
    fullName: "Tran Minh Quan",
    username: "Quan Tran",
    password: "quan123456",
    age: 23,
    gender: "Male",
    phone: "0917285691",
    email: "quan123@gmail.com",
    city: "HCM City",
    role: "Admin",
    status: "Available",
    isDeleted: false,
  },
  {
    fullName: "Tran Minh Quan",
    username: "Quan Tran",
    password: "quan123456",
    age: 23,
    gender: "Male",
    phone: "0917285691",
    email: "quan123@gmail.com",
    city: "HCM City",
    role: "Admin",
    status: "Available",
    isDeleted: false,
  },
  {
    fullName: "Tran Minh Quan",
    username: "Quan Tran",
    password: "quan123456",
    age: 23,
    gender: "Male",
    phone: "0917285691",
    email: "quan123@gmail.com",
    city: "HCM City",
    role: "Admin",
    status: "Available",
    isDeleted: false,
  },
  {
    fullName: "Tran Minh Quan",
    username: "Quan Tran",
    password: "quan123456",
    age: 23,
    gender: "Male",
    phone: "0917285691",
    email: "quan123@gmail.com",
    city: "HCM City",
    role: "Admin",
    status: "Available",
    isDeleted: false,
  },
];

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(seedUser);
};

seedDB().then(() => {
  mongoose.disconnect();
});
