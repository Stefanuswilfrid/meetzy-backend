const prisma = require("../../db");

const findAllEvents = async ({ where, sort, skip, take }) => {

    const events = await prisma.event.findMany({
        orderBy: {
          createdAt: sort,
        },
        where,
        skip,
        take,
      });

  
  return events;
};

const findEventById = async (id) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      user: true
    }
  });
  return event;
};

module.exports = {
    findAllEvents,
    findEventById
};