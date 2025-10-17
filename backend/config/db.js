import mongoose from 'mongoose';

if (!mongoose.connection.readyState) {
    mongoose.connect("mongodb+srv://guptaamarjit777:4CimwemWzP2chirV@my-cluster.pz0rn.mongodb.net/mern-project").then(() => {
        console.log("database connected...");
    }).catch((err) => {
        console.log("database is not connect...");
    });
}

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, require: true, unique: true },
    password: { type: String }
},{timestamps:true});

const User = mongoose.models.UserInfo || mongoose.model("UserInfo", userSchema);

export {User};

const studentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserInfo", require: true },
    rollNo: { type: Number },
    name: { type: String },
    email: { type: String },
    contact: { type: Number },
    course: { type: String }
},{timestamps:true});

const Student = mongoose.models.StudentInfo || mongoose.model("StudentInfo", studentSchema);
export {Student};