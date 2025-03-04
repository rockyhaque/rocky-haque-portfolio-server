import { model, Schema } from 'mongoose'
import { IUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      minlength: 3,
      maxlength: 50,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
        },
        message: '{VALUE} is not a valid email',
      },
      immutable: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      select: false, // hide password from select query [applied when hash]
    },
    photoURL:{
      type: String
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUES} is not valid. Please provide your valid role',
      },
      default: 'user',
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    userStatus: {
      type: String,
      enum: ['active', 'inactive'],
      required: true,
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
)


//* hashing password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

//* not working
// userSchema.pre('save', async function (next) {
//   const user = this;

//   console.log('User object before saving:', user);

//   if (user.password) {
//     try {
//       const saltRounds = Number(config.bcrypt_salt_rounds); // Ensure the number is being passed
//       if (isNaN(saltRounds)) {
//         throw new Error("Salt rounds are not a valid number");
//       }

//       user.password = await bcrypt.hash(user.password, saltRounds);
//       next();
//     } catch (error) {
//       next(error);  // Pass error to next middleware
//     }
//   } else {
//     console.log('Password not provided');
//     next(new Error('Password is required'));
//   }
// });

// * last
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next(); // Hash only if password is modified
  
//   try {
//     const saltRounds = Number(config.bcrypt_salt_rounds) || 10; // Default to 10 if not set
//     this.password = await bcrypt.hash(this.password, saltRounds);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });




userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

const User = model<IUser>('User', userSchema)

export default User
