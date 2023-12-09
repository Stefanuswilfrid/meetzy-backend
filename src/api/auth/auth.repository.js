const prisma = require("../../db/index");

const createUser = async (userData) => {
    // console.log("ud",userData)
  const user = await prisma.user.create({
    data: userData,
  });
  return user;
};

const findUserByEmail = async (email) => {
    const user = await prisma.user.findFirst({
      where: {
        email : email
      },
    });
    return user;
  };

  module.exports = { findUserByEmail, createUser }
