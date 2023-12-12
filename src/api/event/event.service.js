const eventRepository = require("./event.repository");
const utils = require("../../utils/apiUtils");

const formatQueryParams = (queryParams) => {
    const where = {};
    where.startDatetime = {};
    where.endDatetime = {};
    where.title = {};
    where.status = "VERIFIED";
  
    if (queryParams.category) {
      where.category = queryParams.category;
    }
    if (queryParams.location) {
      where.city = queryParams.location;
    }
    if (queryParams.search) {
      where.title.contains = queryParams.search;
      where.title.mode = "insensitive";
    }
    if (queryParams.date_lte && queryParams.date_gte) {
      where.startDatetime.lte = new Date(queryParams.date_lte);
      where.endDatetime.gte = new Date(queryParams.date_gte);
    }
  
    const sort = queryParams.sort ? queryParams.sort : "desc";
  
    const skip =
      queryParams.page && queryParams.limit
        ? (queryParams.page - 1) * queryParams.limit
        : 0;
    const take = queryParams.page && queryParams.limit ? queryParams.limit : 30;
  
    return { where, sort, skip, take };
  };

const getAllEvents = async (queryParams) => {
    try {
      const { where, sort, skip, take } = formatQueryParams(queryParams);
      const events = await eventRepository.findAllEvents({
        where,
        sort,
        skip,
        take,
      });
      return events;
    } catch (err) {
      throw new Error(err);
    }
  };

module.exports = {
  getAllEvents,
};
  