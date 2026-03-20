import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export const register = async (data) => {
  const { name, email, password } = data;

  // check email tồn tại
  const userExist = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  if (userExist.rows.length > 0) {
    throw new Error('Email already exists');
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, hashedPassword]
  );

  return result.rows[0];
};

export const login = async (data) => {
  const { email, password } = data;

  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  return user;
};