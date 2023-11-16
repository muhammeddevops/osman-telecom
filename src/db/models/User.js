import mongoose, { Schema } from 'mongoose';
import { validate as validateEmail } from 'email-validator';
import bcrypt from 'bcrypt';

/**
 * Custom password validator function.
 * @param { String } pw - The password to validate
 
 * https://mongoosejs.com/docs/api/schematype.html#SchemaType.prototype.validate()
 */
//
function validatePassword(pw) {
  console.log('VALIDATE PASSWORD');
  // Contains correct chars, one of each: uppercase, lowercase, number, special
  const hasUppercaseLetter = /[A-Z]/g.test(pw);
  const hasLowercaseLetter = /[a-z]/g.test(pw);
  const hasNumber = /[0-9]/g.test(pw);
  const hasSpecialCharacter = /[^A-Za-z0-9\s]/g.test(pw);

  // Accumulate amendments required to fulfil valid password criteria
  let amendmentsRequired = [];

  if (!hasUppercaseLetter) amendmentsRequired.push('an uppercase letter');
  if (!hasLowercaseLetter) amendmentsRequired.push('a lowercase letter');
  if (!hasNumber) amendmentsRequired.push('a number');
  if (!hasSpecialCharacter)
    amendmentsRequired.push(
      'a special character: ()`~!@#$%^&*-+=|{}[]:;"\'<>,.?/_'
    );

  // Valid password, no amendments required
  if (amendmentsRequired.length === 0) return true;

  // Invalid password, throw message to help user create strong password
  const errorMessage =
    `Missing required character${amendmentsRequired.length > 1 ? 's' : ''}: ` +
    amendmentsRequired.join(', ');

  throw new Error(errorMessage);
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true, //? may not be needed
      required: [true, 'Email is required'],
      validate: [validateEmail, 'Incorrect email format'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Must contain at least 8 characters'],
      maxLength: [16, 'Must not exceed length of 16 characters'],

      validate: {
        // Custom validator for Password
        validator: validatePassword,
        // Catches errors thrown by validatePassword
        // https://mongoosejs.com/docs/api/schematype.html#error-message-templates
        message: (props) => {
          console.log('VALIDATE PASSWORD ERROR:', props.reason.message);
          return props.reason.message;
        },
      },
    },
    role: {
      type: String,
      lowercase: true,
      required: [true, 'a user must have a valid role'],
      // New user is 'basic' if alt role is not specified
      default: 'basic',
      enum: {
        values: ['basic', 'wholesaler', 'admin'],
        message: '{VALUE} is not a valid role',
      },
    },
  },

  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  console.log('Pre-save Middleware');

  const user = this;

  try {
    // Hash password if it has been modified
    if (user.isModified('password')) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(user.password, saltRounds);
      console.log('Password successfully hashed');
    }

    return next();
  } catch (err) {
    console.log('Pre-save Error:', err);
    next(err);
  }
});

// https://stackoverflow.com/questions/62440264/mongoose-nextjs-model-is-not-defined-cannot-overwrite-model-once-compiled
export default mongoose.models.User || mongoose.model('User', userSchema);
