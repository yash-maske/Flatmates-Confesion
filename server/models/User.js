// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
  // No password field per user since it's common
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
