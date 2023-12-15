const prisma = require("../../db");

const findMyTicketAndEvents = async (userId) => {
    console.log("fm",userId)
    const ticketAndEvents = await prisma.ticket.findMany({
      where: {
        userId: userId,
      },
      include: {
        event: {
          include: {
            user: {
              select: {
                email: true,
                fullname: true,
                id: true,
                age: true,
                role: true,
                status: true
              }
            }
          }
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return ticketAndEvents
  };

  module.exports = {
    findMyTicketAndEvents,
};