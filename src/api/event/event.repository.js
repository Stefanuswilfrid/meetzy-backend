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

module.exports = {
    findAllEvents,
};