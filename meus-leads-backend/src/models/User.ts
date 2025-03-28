import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Interface para o documento do usuário
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Interface para o modelo de usuário
interface IUserModel extends Model<IUser> {}

// Schema do usuário
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash da senha antes de salvar
UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Método para comparar senhas
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User: IUserModel = mongoose.model<IUser, IUserModel>("User", UserSchema);
export default User;
