import { User } from '../models/userSchema.js';
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config({
  path: './.env'
});

const jwt_secret = process.env.JWT_SECRET;

const MAX_RETRIES = 3; // You can adjust this value
const RETRY_INTERVAL = 1000; // You can adjust this interval

async function insertUsersDB(data) {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {

      const password = await bcrypt.hash(data.password, 10);

      const user = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: password,
        title: data.title
      });
      const result = await user.save();
      console.log(`${result._id} document inserted.`);

      // Set the expiration time (in seconds)
      const expiresIn = 86400; // 24 hour

      const payload = {
        email: data.email,
        timestamp: Date.now(),
      };

      const token = JWT.sign(payload, jwt_secret, { expiresIn }, { algorithm: "HS256" });

      return token;

    } catch (e) {
      if (e.message.includes('buffering timed out')) {
        console.warn(`Insertion attempt ${retries + 1} timed out. Retrying...`);
        retries++;
        await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
      } else {
        if (e.name === 'ValidationError' && e.errors.email) {
          // Handle the email validation error
          const errorMessage = e.errors.email.message;
          console.error('Email validation error:', errorMessage);
          throw new Error(errorMessage);
        } else {
          console.error('Error while inserting user:', e);
          throw new Error('User insertion failed');
        }
      }
    }
  }
  console.error(`User insertion failed after ${MAX_RETRIES} retries.`);
  throw new Error('User insertion failed');
}


async function getUpdateUserTitleDB(data) {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const filter = { email: data.email };
      const update = { title: data.title };

      // Add the { runValidators: true } option to enforce schema validation
      const result = await User.findOneAndUpdate(filter, update, { runValidators: true });

      if (!result) {
        // Handle the case where no user was found with the provided email
        console.error("User not found");
        return false;
      }

      return true;
    } catch (e) {
      if (e.message.includes('buffering timed out')) {
        console.warn(`Query attempt ${retries + 1} timed out. Retrying...`);
        retries++;
        await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
      } else {
        console.error('Error while querying users:', e);
        throw new Error('An error occurred: ' + e);
      }
    }
  }
  console.error(`Query failed after ${MAX_RETRIES} retries.`);
  throw new Error('An error occurred during the query.');
}


async function chackUserLoginDB(data) {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const documents = await checksIfUsernameExists(data);
      if (!documents) {
        console.log("Username does not exist, you can register!");
        return false
      } else {
        const isPasswordValid = await bcrypt.compare(data.password, documents.password);
        if (isPasswordValid) {
          const payload = {
            email: data.email,
            timestamp: Date.now(),
          };
          const token = JWT.sign(payload, jwt_secret, { algorithm: "HS256" });
          const result = { token: token, title: documents.title };
          return result;
        } else {
          console.log("Email or Password is incorrect.");
          return false
        }
      }
    } catch (e) {
      if (e.message.includes('buffering timed out')) {
        console.warn(`Query attempt ${retries + 1} timed out. Retrying...`);
        retries++;
        await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
      } else {
        console.error('Error while querying users:', e);
        throw new Error('An error occurred: ' + e);
      }
    }
  }
  console.error(`Query failed after ${MAX_RETRIES} retries.`);
  throw new Error('An error occurred during the query.');
}


async function checksIfUsernameExists(data) {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const query = {
        email: data.email
      };

      const documents = await User.findOne(query);
      if (!documents) {
        console.log(false);
        return false;
      } else {
        console.log('This user already exists');
        return documents;
      }
    } catch (e) {
      if (e.message.includes('buffering timed out')) {
        console.warn(`Query attempt ${retries + 1} timed out. Retrying...`);
        retries++;
        await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
      } else {
        console.error('Error while querying users:', e);
        throw new Error('An error occurred: ' + e);
      }
    }
  }
  console.error(`Query failed after ${MAX_RETRIES} retries.`);
  throw new Error('An error occurred during the query.');
}

export { insertUsersDB, getUpdateUserTitleDB, chackUserLoginDB, checksIfUsernameExists };
