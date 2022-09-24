const sequelize = require("../config/connection");
const { User } = require("../models");
const { Blog } = require("../models");
const userSeedData = require("./userSeedData.json");
const blogSeedData = require("./blogSeedData.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedAll();
